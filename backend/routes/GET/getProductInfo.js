const getProductInfo = require('express').Router();
const modelProduct = require('../../models/productModel');


getProductInfo.get("/get-product/:productId", (req, res) => {
    const productId = req.params.productId;
    modelProduct.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ msg: "Produkt nebyl nalezen." });
            }
            return res.json({
                msg: "Úspěšně se nám podařilo získat informace o produktu",
                documents: product
            });
        })
        .catch(err => {
            console.error("Chyba při získávání produktu:", err);
            return res.status(500).json({ msg: "Nastala chyba při získávání produktu." });
        });
});

module.exports = getProductInfo;