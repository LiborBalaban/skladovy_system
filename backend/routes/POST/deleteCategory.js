const deleteCategory = require('express').Router();
const modelCategory = require('../../models/categoryModel');
const modelProduct = require('../../models/productModel');
const getCheckToken = require('../GET/getCheckToken');

deleteCategory.delete("/delete-category/:categoryId", getCheckToken, async(req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const deletedCategory = await modelCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ msg: "Dodavatel nebyl nalezen." });
        }

        await modelProduct.updateMany(
            { category: categoryId },
            { $unset: { category: "" } }
        );

      
        return res.json({ msg: `Dodavatel ${deletedCategory.name} byl úspěšně smazán.` });
    } catch (err) {
        console.error("Chyba při mazání dodavatele:", err);
        return res.status(500).json({ msg: "Nastala chyba při mazání dodavatele." });
    }
});

module.exports = deleteCategory;
