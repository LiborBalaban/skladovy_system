const getStorageInfo = require('express').Router();
const modelStorage = require('../../models/storageModel');


getStorageInfo.get("/get-storage/:storageId", (req, res) => {
    const storageId = req.params.storageId;
    modelStorage.findById(storageId)
        .then(storage => {
            if (!storage) {
                return res.status(404).json({ msg: "Kategorie nebyla nalezena." });
            }
            return res.json({
                msg: "Úspěšně se nám podařilo získat informace o kategorii",
                documents: storage
            });
        })
        .catch(err => {
            console.error("Chyba při získávání kategorie:", err);
            return res.status(500).json({ msg: "Nastala chyba při získávání kategorie." });
        });
});

module.exports = getStorageInfo;