const express = require('express');
const saveProduct = express.Router();
const modelProduct = require('../../models/productModel');
const getCheckToken = require('../GET/getCheckToken');
const userModel = require('../../models/userModel');
const storageModel = require('../../models/storageModel');

saveProduct.post("/save-product", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, code, category, description } = req.body;
        
        const user = await userModel.findOne({ _id: userId });
        
        if (!user) {
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }
        
        const product = new modelProduct({
            name: name,
            code: code,
            category: category,
            description: description,
            storage: user.storage 
        });

        const savedProduct = await product.save();

        const updatedStorage = await storageModel.findOneAndUpdate(
            { _id: user.storage }, 
            { $push: { products: savedProduct._id } }, 
            { new: true } 
        );
  
        return res.json({
            msg: `Produkt ${savedProduct.name} byl úspěšně uložen.`,
            storage: updatedStorage,
            product_id:savedProduct._id
        });
    } catch (error) {
        console.error('Chyba při ukládání produktu:', error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k uložení produktu."
        });
    }
});

module.exports = saveProduct;