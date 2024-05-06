const getCategories = require('express').Router();
const userModel = require('../../models/userModel');
const getCheckToken = require('./getCheckToken');

getCategories.get("/get-categories", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Získání uživatele včetně jeho skladu s kategoriemi
        const user = await userModel.findById(userId).populate({
            path: 'storage',
            populate: {
                path: 'categories',
                model: 'Category'
            }
        });

      
        if (!user) {
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }
        
    
        return res.json({
            msg: "Úspěšně se nám podařilo získat kategorie",
            categories: user.storage.categories
        });
    } catch (error) {
        console.error("Chyba při získávání kategorií:", error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání kategorií",
            categories: []
        });
    }
});

module.exports = getCategories;