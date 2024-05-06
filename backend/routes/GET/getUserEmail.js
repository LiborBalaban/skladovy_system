const getUserEmail = require('express').Router();
const userModel = require('../../models/userModel');
const getCheckToken = require('../GET/getCheckToken');

getUserEmail.get("/get-useremail", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }
        return res.json({
            msg: "Úspěšně se nám podařilo získat uživatele",
            documents: user.email
        });
    } catch (err) {
        console.error("Chyba při získávání uživatele:", err);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání uživatele",
            documents: []
        });
    }
});

module.exports = getUserEmail;