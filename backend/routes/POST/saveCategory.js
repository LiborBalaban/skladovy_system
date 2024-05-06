const saveCategory = require('express').Router();
const modelCategory = require('../../models/categoryModel');
const modelStorage = require('../../models/storageModel');
const getCheckToken = require('../GET/getCheckToken');

saveCategory.post("/save-category", getCheckToken, async (req, res) => {
    try {
        const storageId = req.user.storage;
        const { name, description, positionId } = req.body;
        
        const category = new modelCategory({
            name: name,
            description: description,
            position: positionId
        });

    
        const savedCategory = await category.save();

    
        const updatedStorage = await modelStorage.findOneAndUpdate(
            { _id: storageId }, 
            { $push: { categories: savedCategory._id } }, 
            { new: true }
        );

       
        return res.json({
            msg: `Kategorie ${savedCategory.name} byla úspěšně uložena.`,
            storage: updatedStorage
        });
    } catch (error) {
        console.error('Chyba při ukládání kategorie:', error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k uložení kategorie."
        });
    }
});

module.exports = saveCategory;