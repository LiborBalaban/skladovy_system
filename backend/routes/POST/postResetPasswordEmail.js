const sendPasswordEmail = require('express').Router();
const modelUser = require('../../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


sendPasswordEmail.post("/send-resetpassword-email", async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await modelUser.findOne({email:email});
        if(!user){
            return res.status(404).json({ msg: "Uživatel nenalezen" });
        }
       const resetAdress = `http://localhost:3000/set-password/${user._id}`;
        await transporter.sendMail({
            to: email,
            subject: 'Reset password',
            html: `<p>Klikněte zde: <a href="${resetAdress}">${resetAdress}</a> a změňte si heslo</p>`
        });

        res.json({
            msg: `Email s resetem hesla byl úspěšně odeslán na váš Email`
        });
    } catch (error) {
        console.error("Chyba při odesílání emailu", error);
        res.status(500).json({ msg: "Bohužel došlo k chybě při odesílání emailu." });
    }
});

module.exports = sendPasswordEmail;