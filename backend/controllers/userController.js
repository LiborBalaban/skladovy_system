const prisma = require('../databaze/prisma');
const cookie = require('cookie');
const { mailer } = require('../services/emailMailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (length = 32) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
};

exports.registrationUser = async(req, res) => {
        const { userName, userEmail, userPassword, storageId, companyName} = req.body;
         const token = generateToken();
         const hashedPassword = await bcrypt.hash(userPassword, 10);
         const roleId = 3;

         try {

            const company = await prisma.company.create({
                data: {
                  name: companyName,
                },
              });
            

            const user = await prisma.user.create({
                data: {
                    name: userName,
                    password: hashedPassword,
                    email: userEmail,
                    token:token,
                    roleId:roleId,
                    companyId: company.id,
                },
            });
     
             const activateadress = `http://localhost:3000/activate/${token}`;

             const transporter = mailer();
            
             await transporter.sendMail({
                from: process.env.EMAIL,
                 to: userEmail,
                 subject: 'Verification Code',
                 html: `<p>Klikněte zde: <a href="${activateadress}">${activateadress}</a> a ověřte svůj účet</p>`
             });
     
             res.json({
                 message: `Uživatel ${user.email} a byl úspěšně uložen a ověřovací kód byl odeslán na e-mail.`
             });
         } catch (error) {
             console.error("Chyba při ukládání uživatele:", error);
             res.status(500).json({ message: "Bohužel došlo k chybě při ukládání uživatele nebo odesílání ověřovacího kódu." });
         }
};


exports.registrationEmployee = async(req, res) => {
    const { url_token, userPassword, userName} = req.body;
    const token = generateToken();
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const decodedToken = jwt.verify(url_token, process.env.TOKEN);
    const email = decodedToken.email;
    const companyId = decodedToken.company;
    const role = parseInt(decodedToken.role);
    let storageId = null;
    
    if(decodedToken.storage){
        storageId = parseInt(decodedToken.storage);
    }
     try {
        const user = await prisma.user.create({
            data: {
                name: userName,
                password: hashedPassword,
                email: email,
                token:token,
                roleId:role,
                companyId: companyId,
                storageId: storageId
            },
        });
 
         const activateadress = `http://localhost:3000/activate/${token}`;

         const transporter = mailer();
        
         await transporter.sendMail({
            from: process.env.EMAIL,
             to: email,
             subject: 'Verification Code',
             html: `<p>Klikněte zde: <a href="${activateadress}">${activateadress}</a> a ověřte svůj účet</p>`
         });
 
         res.json({
             message: `Uživatel ${user.email} a byl úspěšně uložen a ověřovací kód byl odeslán na e-mail.`
         });
     } catch (error) {
         console.error("Chyba při ukládání uživatele:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při ukládání uživatele nebo odesílání ověřovacího kódu." });
     }
};


exports.crateEmployee = async(req, res) => {
    const { employeeEmail, roleId, storageId } = req.body;
    const companyId = req.user.companyId;
        
    if(!companyId){
        res.status(500).json({ message: "Chybí ID firmy" });
    }
    
    const employee_token = jwt.sign({role: roleId, email:employeeEmail, company: companyId , storage:storageId}, process.env.TOKEN, {expiresIn:'24h'});
    
    const link = `http://localhost:3000/sing-up-employee/${employee_token}`;
    
    const transporter = mailer();
        
         await transporter.sendMail({
            from: process.env.EMAIL,
             to: employeeEmail,
             subject: 'Registrace do firmy',
             html: `<p>Klikněte zde: <a href="${link}">${link}</a> a zaregistrujte se</p>`
         });
    
         res.json({
            message: `Uživateli ${employeeEmail} byl úspěšně odeslán email s ověřovacím tokenem.`
        });
};



exports.verification = async (req, res) => {
    const { token } = req.body;

    // Hledání uživatele podle tokenu
    const user = await prisma.user.findFirst({
        where: { token: token }
    });

    // Pokud uživatel s tímto tokenem neexistuje
    if (!user) {
        return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Pokud uživatel existuje, aktualizuj jeho status na aktivní
    try {
        await prisma.user.update({
            where: { id: user.id },  // Používáme id pro update
            data: { isActive: true }
        });

        res.status(200).json({ message: 'Account activated successfully' });
    } catch (error) {
        console.error("Chyba při aktualizaci uživatele:", error);
        res.status(500).json({ message: 'Chyba při aktivaci účtu' });
    }
};


exports.loginUser = async(req, res) => {
    const { userEmail, userPassword } = req.body;
        const user = await prisma.user.findUnique(
            {
                where: {email:userEmail},
            });
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (user.isActive === false) {
          return res.status(403).json({ message: 'Account not activated' });
        }
        const isPasswordValid = await bcrypt.compare(userPassword, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        const token = jwt.sign({role: user.roleId, id:user.id, company: user.companyId , storage:user.storageId}, process.env.TOKEN, {expiresIn:'24h'});
        
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,  // Cookie není dostupná pro JavaScript
            secure: process.env.NODE_ENV === 'production',  // Pouze pro HTTPS
            maxAge: 24 * 60 * 60,  // 24 hodin
            path: '/'  // Cookie je dostupná pro celou aplikaci
        }));

        return res.status(200).json({
            message: 'Přihlášení probíhlo správně',
            storageId: user.storageId || null,
            companyId: user.companyId || null,
        });
};

exports.getUsers = async(req, res) => {
        try{
            const users = await prisma.user.findMany();

            if (!users) {
                return res.status(404).json({ message: 'Users not found' });
              }

              return res.json({
              message: "Úspěšně se nám podařilo získat uživatele",
              documents: users
            });
        }
        catch (error) {
        console.error("Chyba při hledání uživatelů:", error);
        res.status(500).json({ message: 'Chyba při hledání účtu' });
    }
        
};

exports.getUser = async(req, res) => {
    const userId = parseInt(req.params.userId);
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          return res.json({
          message: "Úspěšně se nám podařilo získat uživatele",
          documents: user
        });
    }
    catch (error) {
    console.error("Chyba při hledání uživatelů:", error);
    res.status(500).json({ message: 'Chyba při hledání účtu' });
}
    
};