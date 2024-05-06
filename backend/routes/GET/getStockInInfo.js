const getStockin = require('express').Router();
const stockinModel = require('../../models/product_stockModel');
const userModel = require('../../models/userModel');
const getCheckToken = require('./getCheckToken');

getStockin.get("/get-stockin", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await userModel.findOne({_id: userId})
            .populate({
                path: 'storage',
                populate: {
                    path: 'stockin',
                    model: 'Product_Stock',
                    populate: {
                        path: 'stockin',
                        model: 'StockIn',
                        populate: {
                            path: 'supplier',
                            model: 'Supplier'
                        }
                    }
                }
            }) .populate({
                path: 'storage',
                populate: {
                    path: 'stockin',
                    model: 'Product_Stock',
                    populate: {
                        path: 'product',
                        model: 'Product',
                    }
                }
            })
        
        if (!user) {
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }

        const stockin = user.storage.stockin;

        return res.json({
            msg: "Úspěšně se nám podařilo získat naskladnění",
            documents: stockin
        });
    } catch (error) {
        console.error("Chyba při získávání naskladnění:", error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání naskladnění",
            documents: []
        });
    }
});

module.exports = getStockin;
