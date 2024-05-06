const updateProduct = require('express').Router();
const modelProduct = require('../../models/productModel');
const getCheckToken = require('../GET/getCheckToken');

updateProduct.put("/update-product/:productId", getCheckToken, (req, res) => {
    const productId = req.params.productId;
    const { name, code, category, description} = req.body;
    
  
    modelProduct.findByIdAndUpdate(productId, { name:name,
        name:name,
        code:code,
        category:category,
        description:description}, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ msg: "Produkt nebyl nalezen." });
            }
            return res.json({ msg: `Produkt ${updatedProduct.name} byl úspěšně aktualizován.`, updatedProduct });
        })
        .catch(err => {
            console.error("Chyba při aktualizaci produktu:", err);
            return res.status(500).json({ msg: "Nastala chyba při aktualizaci produktu." });
        });
});

module.exports = updateProduct;