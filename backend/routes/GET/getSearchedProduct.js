const express = require('express');
const searchedProduct = express.Router();
const productModel = require('../../models/productModel');
const ProductImage = require('../../models/productImageModel');
const userModel = require('../../models/userModel');
const getCheckToken = require('../GET/getCheckToken');

searchedProduct.get("/searched-product", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const searchTerm = req.query.q;

        const user = await userModel.findOne({_id: userId});
        if (!user){
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }

        let productsQuery = { storage: user.storage };
        if (searchTerm) {
            productsQuery.name = { $regex: searchTerm, $options: 'i' };
        }

        const products = await productModel.find(productsQuery).populate('category').limit(10);
        
        if (!products || products.length === 0) {
            return res.status(404).json({ msg: "Produkty nebyly nalezeny." });
        }
   
        const productsWithImages = await Promise.all(products.map(async (product) => {
            const images = await ProductImage.find({ product: product._id });
            return { ...product.toObject(), images };
        }));

        return res.json({
            msg: "Úspěšně se nám podařilo získat produkty a obrázky",
            documents: productsWithImages
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání produktů a obrázků",
            documents: []
        });
    }
});

module.exports = searchedProduct;