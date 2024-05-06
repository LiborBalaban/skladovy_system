const getPositions = require('express').Router();
const positionModel = require('../../models/positionModel');
const userModel = require('../../models/userModel');
const getCheckToken = require('./getCheckToken');

getPositions.get("/get-positions", getCheckToken, async(req, res) => {
try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).populate('storage').populate({
        path: 'storage',
            populate: {
                path: 'positions',
                model: 'Position'
            }
    });
    if (!user) {
        return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
    }
    
    return res.json({
        msg: "Úspěšně se nám podařilo získat pozice",
        documents: user.storage.positions
    });
} catch (error) {
    console.error("Chyba při získávání pozic:", error);
    return res.status(500).json({
        msg: "Bohužel nedošlo k získání pozic",
        documents: [],
    });
}
});

module.exports = getPositions;