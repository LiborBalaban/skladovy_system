const modelProduct = require('../../models/productModel');


exports.getProducts= async(req, res) => {
    const userId = req.user.id;
    try {
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
        
};
};

exports.getProductDetail= async(req, res) => {
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
};


exports.createProduct = async(req, res) => {
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
};


exports.updateProduct = async(req, res) => {
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
};



exports.deleteProduct = async(req, res) => {
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
};