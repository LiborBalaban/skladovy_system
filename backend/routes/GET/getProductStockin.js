const getProductStockin = require('express').Router();
const userModel = require('../../models/userModel');
const getCheckToken = require('./getCheckToken');

getProductStockin.get("/get-product-stockin/:productId", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        
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
            }).populate({
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

        const stockin = user.storage.stockin.filter(stock => stock.product._id.toString() === productId);

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

module.exports = getProductStockin;