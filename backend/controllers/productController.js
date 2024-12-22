const prisma = require('../databaze/prisma');


exports.getProductsByCompany= async(req, res) => {
  
    try {
        const companyId = req.user.companyId;
        const products = await prisma.product.findMany({
            where: {
             companyId:companyId
            },
            include: {
              category: true,
              position: true,
              images: {
                take: 1, // Vrátí pouze první obrázek
              },
            },
          });
         
        if (!products) {
            return res.status(404).json({ message: "Produkty nebyly nalezeny." });
        }
        
        return res.json({
            message: "Úspěšně se nám podařilo získat produkty",
            documents: products
        });
    } catch (error) {
        console.error("Chyba při získávání produktů:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání produktů",
            documents: []
        });
    }
};

exports.getSearchedProducts= async(req, res) => {
  
    try {
        const search = req.query.search.toLowerCase();
        
        const products = await prisma.product.findMany({
            where: {
             name:{
                contains: search
             }
            }
          });
         
        if (!products) {
            return res.status(404).json({ message: "Produkty nebyly nalezeny." });
        }
        
        return res.json({
            message: "Úspěšně se nám podařilo získat produkty",
            documents: products
        });
    } catch (error) {
        console.error("Chyba při získávání produktů:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání produktů",
            documents: []
        });
    }
};

exports.getProductsByStorage= async(req, res) => {
  
    try {
        const storageId = req.user.storageId;
        
        const products = await prisma.product.findMany({
            where: {
             storage:storageId
            },
            include: {
              storage: true,
            },
            include:{
                category:true,
            }
          });
         
        if (!products) {
            return res.status(404).json({ message: "Produkty nebyly nalezeny." });
        }
        
        return res.json({
            message: "Úspěšně se nám podařilo získat produkty",
            documents: products
        });
    } catch (error) {
        console.error("Chyba při získávání produktů:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání produktů",
            documents: []
        });
    }
};

exports.getProductDetail= async(req, res) => {
    const productId = req.params.productId;
    try {
        const product = await prisma.product.findUnique({
            where: {
             id:parseInt(productId)
            }
          });
         
        if (!product) {
            return res.status(404).json({ message: "Produkt nebyl nalezen." });
        }
        
        return res.json({
            message: "Úspěšně se nám podařilo získat produkt",
            documents: product
        });
    } catch (error) {
        console.error("Chyba při získávání produktu:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání produktu",
            documents: []
        });
    }
};


exports.createProduct = async(req, res) => {
     const { productName, productCode, productCategoryId, productDescription, productQuantity, productPositionId} = req.body;

     const companyId = req.user.companyId;

     if (!companyId) {
         return res.status(400).json({ message: "Chybí informace o ID společnosti." });
     }
 
     try{
         const product = await prisma.product.create({
             data:{
                 name:productName,
                 code: productCode,
                 description: productDescription,
                 categoryId: parseInt(productCategoryId),
                 quantity:parseInt(productQuantity),
                 positionId:parseInt(productPositionId),
                 companyId:parseInt(companyId)
             },
         })
 
         if(product){
             return res.status(200).json({ 
                message: `Produkt ${product.name} byl úspěšně vytvořen.`,
                productId: product.id
             });
         }
         else{
             res.status(500).json({ message: "Produkt nebyl vytvořen." });  
         }
     }
     catch (error) {
         console.error("Chyba při vytváření produktu:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při vytváření produktu." });
     }
};


exports.updateProduct = async(req, res) => {
    const productId = req.params.productId;
    const { productName, productCode, productCategoryId, productDescription, productStrageId, productQuantity, positions} = req.body;

    const companyId = req.user.companyId;

    if (!companyId) {
        return res.status(400).json({ message: "Chybí informace o ID společnosti." });
    }

    try{
        const product = await prisma.product.update({
            where:{
                id:parseInt(productId)
            },
            data:{
                name:productName,
                code: productCode,
                description: productDescription,
                categoryId:productCategoryId,
                storageId:productStrageId,
                quantity:productQuantity,
                positions:{
                   connect: positions.map((positionId) => ({ id: positionId })),
                }
            },
        })

        if(product){
            return res.status(200).json({ 
               message: `Produkt ${product.name} byl úspěšně aktualizován.`
            });
        }
        else{
            res.status(500).json({ message: "Produkt nebyl aktualizován." });  
        }
    }
    catch (error) {
        console.error("Chyba při aktualizaci produktu:", error);
        res.status(500).json({ message: "Bohužel došlo k chybě při aktualizaci produktu." });
    }
};



exports.deleteProduct = async(req, res) => {
      try {
            const productId = req.params.productId;

            const deletedProduct = await prisma.product.delete({
                where:{
                    id:parseInt(productId)
                }
            });
            if (!deletedProduct) {
                return res.status(404).json({ msg: "Produkt nebyl nalezen." });
            }
    
            return res.json({ msg: `Produkt ${deletedProduct.name} byl úspěšně smazán.` });
        } catch (err) {
        
            console.error("Chyba při mazání produktu:", err);
            return res.status(500).json({ msg: "Nastala chyba při mazání produktu." });
        }
};