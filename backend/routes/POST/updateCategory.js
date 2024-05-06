const updateCategory = require('express').Router();
const modelCategory = require('../../models/categoryModel');
const getCheckToken = require('../GET/getCheckToken');

updateCategory.put("/update-category/:categoryId", getCheckToken, (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;
    
    // Najděte kategorii pomocí ID a aktualizujte ji
    modelCategory.findByIdAndUpdate(categoryId, { name: name, description: description }, { new: true })
        .then(updatedCategory => {
            if (!updatedCategory) {
                return res.status(404).json({ msg: "Kategorie nebyla nalezena." });
            }
            return res.json({ msg: `Kategorie ${updatedCategory.name} byla úspěšně aktualizována.`, updatedCategory });
        })
        .catch(err => {
            console.error("Chyba při aktualizaci kategorie:", err);
            return res.status(500).json({ msg: "Nastala chyba při aktualizaci kategorie." });
        });
});

module.exports = updateCategory;