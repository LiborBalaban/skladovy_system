const express = require('express');
const deleteProduct = express.Router();
const modelProduct = require('../../models/productModel');
const modelStockIn = require('../../models/product_stockModel');
const modelStockOut = require('../../models/product_stockoutModel');
const modelImages = require('../../models/productImageModel');
const getCheckToken = require('../GET/getCheckToken');

deleteProduct.delete("/delete-product/:productId", getCheckToken, async (req, res) => {
    try {
        const productId = req.params.productId;

        
        const deletedProduct = await modelProduct.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Produkt nebyl nalezen." });
        }

        await modelStockIn.deleteMany({ product: productId });

        await modelStockOut.deleteMany({ product: productId });

        await modelImages.deleteMany({product:productId});

        return res.json({ msg: `Produkt ${deletedProduct.name} byl úspěšně smazán.` });
    } catch (err) {
    
        console.error("Chyba při mazání produktu:", err);
        return res.status(500).json({ msg: "Nastala chyba při mazání produktu." });
    }
});

module.exports = deleteProduct;