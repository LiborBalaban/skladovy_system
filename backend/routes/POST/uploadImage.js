const uploadImage = require('express').Router();
const modelProductImage = require('../../models/productImageModel');
const multer = require('multer');
const getCheckToken = require('../GET/getCheckToken');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../frontend/src/Images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


uploadImage.post("/upload-image", getCheckToken, upload.single('image'), (req, res) => {

    const imagePath = req.file.path;
    const {product} = req.body;
    const image = new modelProductImage({
        url:imagePath,
        product:product
    });
    
    image.save()
        .then(document => {
            return res.json({
                msg: `Došlo k uložení obrázku ${JSON.stringify(document)}`
            });
        })
        .catch(err => {
            return res.json({
                msg: "Bohužel nedošlo k uložení obrázku"
            });
        });
});

module.exports = uploadImage;