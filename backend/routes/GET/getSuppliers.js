const getSuppliers = require('express').Router();
const suppliers = require('../../models/supplierModel');
const getCheckToken = require('./getCheckToken');
const userModel = require('../../models/userModel');

getSuppliers.get("/get-suppliers", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await userModel.findById(userId).populate({
            path: 'storage',
            populate: {
                path: 'supplier',
                model: 'Supplier'
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }
        
        return res.json({
            msg: "Úspěšně se nám podařilo získat dodavatele",
            suppliers: user.storage.supplier
        });
    } catch (error) {
        console.error("Chyba při získávání dodavatelů:", error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání dodavatelů",
            suppliers: []
        });
    }
});

module.exports = getSuppliers;