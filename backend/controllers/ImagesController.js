const modelProductImage = require('../../models/productImageModel');
const multer = require('multer');
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


exports.getAllImages = async(req, res) => {
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
};


exports.uploadImage = async(req, res) => {
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
};



exports.deleteImage = async(req, res) => {
    try {
            const categoryId = req.params.categoryId;
    
            const deletedCategory = await modelCategory.findByIdAndDelete(categoryId);
            if (!deletedCategory) {
                return res.status(404).json({ msg: "Dodavatel nebyl nalezen." });
            }
    
            await modelProduct.updateMany(
                { category: categoryId },
                { $unset: { category: "" } }
            );
    
          
            return res.json({ msg: `Dodavatel ${deletedCategory.name} byl úspěšně smazán.` });
        } catch (err) {
            console.error("Chyba při mazání dodavatele:", err);
            return res.status(500).json({ msg: "Nastala chyba při mazání dodavatele." });
        }
};