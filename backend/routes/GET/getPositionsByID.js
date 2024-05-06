const getPositionsByID = require('express').Router();
const Position = require('../../models/positionModel');

getPositionsByID.get("/get-positions/:storageId", async (req, res) => {
    try {
        const storageId = req.params.storageId;
        const positions = await Position.find({ storage: storageId });
        return res.json({
            msg: "Úspěšně se nám podařilo získat pozice",
            documents: positions
        });
    } catch (err) {
        console.error("Chyba při získávání pozic:", err);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání pozic",
            documents: []
        });
    }
});

module.exports = getPositionsByID;