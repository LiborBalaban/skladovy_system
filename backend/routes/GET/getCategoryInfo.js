const getCategoryInfo = require('express').Router();
const modelCategory = require('../../models/categoryModel');


getCategoryInfo.get("/get-category/:categoryId", (req, res) => {
    const categoryId = req.params.categoryId;
    modelCategory.findById(categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).json({ msg: "Kategorie nebyla nalezena." });
            }
            return res.json({
                msg: "Úspěšně se nám podařilo získat informace o kategorii",
                documents: category
            });
        })
        .catch(err => {
            console.error("Chyba při získávání kategorie:", err);
            return res.status(500).json({ msg: "Nastala chyba při získávání kategorie." });
        });
});

module.exports = getCategoryInfo;