const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const ProductImage = require('../../models/productImageModel');
const userModel = require('../../models/userModel');
const getCheckToken = require('../GET/getCheckToken');

router.get("/get-products", getCheckToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findOne({_id: userId});
        if (!user){
            return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
        }
        
          const products = await Product.find({ storage: user.storage }).populate('category').populate({
            path: 'category',
                populate: {
                    path: 'position',
                    model: 'Position'
                }
        });
        
      
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

module.exports = router;