const nodemailer = require('nodemailer');
require('dotenv').config();
exports.mailer = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    return transporter;
};