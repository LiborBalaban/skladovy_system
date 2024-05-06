const getProductImages = require('express').Router();
const modelProductImages = require('../../models/productImageModel');

getProductImages.get("/get-productimages/:productId", (req, res) => {
    const productId = req.params.productId;
    
    modelProductImages.find({ product: productId })
        .then(images => {
            if (!images) {
                return res.status(404).json({ msg: "Obrázky nebyly nalezeny." });
            }
            return res.json({
                msg: "Úspěšně se nám podařilo získat obrázky produktu",
                documents: images
            });
        })
        .catch(err => {
            console.error("Chyba při získávání obrázků:", err);
            return res.status(500).json({ msg: "Nastala chyba při získávání obrázků." });
        });
});

module.exports = getProductImages;