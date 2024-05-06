const saveEmployee = require('express').Router();
const modelEmployee = require('../../models/employeeModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'liborbalabanprojects@gmail.com',
        pass: 'yzpt bccm eqpw vqbk'
    }
});


saveEmployee.post("/save-employee", async (req, res) => {
    const { name, surname, email, phone, storage_id} = req.body; 
    const activateadress = "http://localhost:3000/set-password";
    
    try {
        const employee = new modelEmployee({
            name: name,
            surname:surname,
            email:email,
            phone:phone,
            storage_id:storage_id,
            role:"zamestnanec"
        });

        const savedEmployee = await employee.save();

        await transporter.sendMail({
            to: email,
            subject: 'Účet v aplikaci MyStorage',
            html: `<p>Klikněte zde: <a href="${activateadress}">${activateadress}</a> a změňte si heslo. Poté se přihlašte do aplikce</p>`
        });

        res.json({
            msg: `Uživatel ${savedEmployee.email} byl úspěšně uložen a ověřovací kód byl odeslán na e-mail.`
        });
    } catch (error) {
        console.error("Chyba při ukládání uživatele:", error);
        res.status(500).json({ msg: "Bohužel došlo k chybě při ukládání uživatele nebo odesílání ověřovacího kódu." });
    }
});



module.exports = saveEmployee;