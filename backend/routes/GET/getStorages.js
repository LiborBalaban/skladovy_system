const getStorages = require('express').Router();
const storages = require('../../models/storageModel');
const getCheckToken = require('../GET/getCheckToken');

getStorages.get("/get-storages", getCheckToken, (req, res) => {
    const storageId = req.user.storage;
    storages.findById(storageId)
        .then(docs => {
            return res.json({
                msg: "Úspěšně se nám podařilo získat sklady",
                documents: docs
            });
        })
        .catch(err => {
            return res.json({
                msg: "Bohužel nedošlo k získání skladů",
                documents: []
            });
        });
});

module.exports = getStorages;