const saveStorage = require('express').Router();
const modelStorage = require('../../models/storageModel');

saveStorage.post("/save-storage", (req, res) => {
    const { name, phone, address, psc, city, user} = req.body;
    console.log(req.body);
    const storage = new modelStorage({
        name:name,
        phone:phone,
        address:address,
        psc:psc,
        city:city,
        user:user,
    });
    
    storage.save()
        .then(document => {
            return res.json({
                msg: `Došlo k uložení skladu ${JSON.stringify(document)}`
            });
        })
        .catch(err => {
            return res.json({
                msg: "Bohužel nedošlo k uložení skladu"
            });
        });
});

module.exports = saveStorage;