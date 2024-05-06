const getStoragebyId = require('express').Router();
const storageModel = require('../../models/storageModel');
const userModel = require('../../models/userModel');
const getCheckToken = require('../GET/getCheckToken');

getStoragebyId.get("/get-storage", getCheckToken, async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findOne({_id:userId});
        if (!user) {
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }
        const storage = await storageModel.findById(user.storage);
        if (!storage) {
            return res.status(404).json({ msg: "Sklad nebyl nalezen." });
        }
        return res.json({
            msg: "Úspěšně se nám podařilo získat sklad",
            documents: storage
        });
    } catch (err) {
        console.error("Chyba při získávání skladu:", err);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání skladu",
            documents: []
        });
    }
});


module.exports = getStoragebyId;