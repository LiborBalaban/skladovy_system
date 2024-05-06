const getStockOut = require('express').Router();
const userModel = require('../../models/userModel');
const getCheckToken = require('./getCheckToken');

getStockOut.get("/get-stockout", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await userModel.findOne({_id: userId})
            .populate({
                path: 'storage',
                populate: {
                    path: 'stockout',
                    model: 'Product_StockOut',
                    populate: {
                        path: 'stockout',
                        model: 'StockOut',
                    },
                },
            })
            .populate({
                path: 'storage',
                populate: {
                    path: 'stockout',
                    model: 'Product_StockOut',
                    populate: {
                        path: 'product',
                        model: 'Product',
                    }
                }
            });
        
        if (!user) {
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }

        const stockout = user.storage.stockout;

        return res.json({
            msg: "Úspěšně se nám podařilo získat vyskladnění",
            documents: stockout
        });
    } catch (error) {
        console.error("Chyba při získávání vyskladnění:", error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání vyskladnění",
            documents: [],
        });
    }
});

module.exports = getStockOut;