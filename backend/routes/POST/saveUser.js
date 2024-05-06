const saveUser = require('express').Router();
const modelUser = require('../../models/userModel');
const storageModel = require('../../models/storageModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000);
};

saveUser.post("/save-user", async (req, res) => {
    const { email, password, storagename } = req.body;
    const verificationCode = generateVerificationCode();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const storage = new storageModel({
            name:storagename
        })

        const user = new modelUser({
            email: email,
            password: hashedPassword,
            code: verificationCode,
            role:"admin",
            storage:storage._id
        });

        const savedUser = await user.save();
        const savedStorage = await storage.save();

        const activateadress = `http://localhost:3000/activate/${savedUser._id}`;

        await transporter.sendMail({
            to: email,
            subject: 'Verification Code',
            html: `<p>Klikněte zde: <a href="${activateadress}">${activateadress}</a> a zadejte Váš ověřovací kód: <strong>${verificationCode}</strong></p>`
        });

        res.json({
            msg: `Uživatel ${savedUser.email} a sklad ${savedStorage.name} byl úspěšně uložen a ověřovací kód byl odeslán na e-mail.`
        });
    } catch (error) {
        console.error("Chyba při ukládání uživatele:", error);
        res.status(500).json({ msg: "Bohužel došlo k chybě při ukládání uživatele nebo odesílání ověřovacího kódu." });
    }
});

module.exports = saveUser;