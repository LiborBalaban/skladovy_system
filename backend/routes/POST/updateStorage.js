const updateStorage = require('express').Router();
const modelStorage = require('../../models/storageModel');
const getCheckToken = require('../GET/getCheckToken');

updateStorage.put("/update-storage/:storageId", getCheckToken, (req, res) => {
    const storageId = req.params.storageId;
    const { name, phone, address, psc, city } = req.body;
    
  
    modelStorage.findByIdAndUpdate(storageId, { name:name,
        phone:phone,
        address:address,
        psc:psc,
        city:city }, { new: true })
        .then(updatedStorage => {
            if (!updatedStorage) {
                return res.status(404).json({ msg: "Sklad nebyl nalezen." });
            }
            return res.json({ msg: `Sklad ${updatedStorage.name} byl úspěšně aktualizován.`, updatedStorage });
        })
        .catch(err => {
            console.error("Chyba při aktualizaci kategorie:", err);
            return res.status(500).json({ msg: "Nastala chyba při aktualizaci skladu." });
        });
});

module.exports = updateStorage;