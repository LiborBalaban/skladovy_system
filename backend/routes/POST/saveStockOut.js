const express = require('express');
const saveStockOut = express.Router();
const modelStockOut = require('../../models/stockoutModel');
const modelProductStockOut = require('../../models/product_stockoutModel');
const productModel = require('../../models/productModel');
const storageModel = require('../../models/storageModel')
const getCheckToken = require('../GET/getCheckToken');
const userModel = require('../../models/userModel');

saveStockOut.post("/save-stockout", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findOne({ _id: userId });
        const storageId = user.storage;

        const {description, stockData } = req.body;
        
        const newStocking = new modelStockOut({
            description: description,
            storage: storageId,
            user:userId
        });
        await newStocking.save();

        const newProductStockIds = [];
        const promises = stockData.map(async (stock) => {
            const { productId, quantity } = stock;


            const product_stock = new modelProductStockOut({
                product: productId,
                stockout: newStocking._id,
                quantity: quantity
            });
            const savedStockinProduct = await product_stock.save();
            newProductStockIds.push(savedStockinProduct._id);

    
            const product = await productModel.findById(productId);
            if (product) {
                product.quantity -= parseInt(quantity);
                await product.save();
            }
        });

        await Promise.all(promises);

        const updatedStorage = await storageModel.findByIdAndUpdate(
            storageId,
            { $push: { stockout: { $each: newProductStockIds } } },
            { new: true }
        );

        return res.json({
            msg: `Příjem zboží byl úspěšně uložen.`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Nastala chyba při ukládání příjmu zboží.", error: error.message });
    }
});

module.exports = saveStockOut;