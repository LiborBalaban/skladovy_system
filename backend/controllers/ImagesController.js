const prisma = require('../databaze/prisma');

exports.getAllImages = async(req, res) => {
     const productId = parseInt(req.params.productId);
         
     try {
    
        const images = await prisma.productImage.findMany({
            where: {
              productId:productId
            },
          });
         
        if (!images) {
            return res.status(404).json({ message: "Obrázky nebyly nalezeny." });
        }
        
        return res.json({
            message: "Úspěšně se nám podařilo získat obrázky produktu",
            documents: images
        });
    } catch (error) {
        console.error("Chyba při získávání obrázků:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání¨obrázků",
            documents: []
        });
    }  
};


exports.uploadImage = async(req, res) => {
    const { productId } = req.body;
    const productImages = req.files;
    console.log(req.files);

    if (!productId) {
        return res.status(400).json({ message: "Chybí ID produktu." });
    }
    if (!productImages || productImages.length === 0) {
        return res.status(400).json({ message: 'Žádné obrázky nebyly nahrány.' });
      }
    try {

        const uploadedImages = [];
        for (const file of productImages) {
            const newImage = await prisma.productImage.create({
                data: {
                    url: file.path,       // Uložení cesty k obrázku
                    productId: parseInt(productId), // Propojení s produktem
                },
            });
            uploadedImages.push(newImage);
        }

        return res.json({
            message: `${uploadedImages.length} obrázků bylo úspěšně nahráno.`,
        });
    } catch (error) {
        console.error("Chyba při nahrávání obrázků:", error);
        return res.status(500).json({
            message: "Došlo k chybě při ukládání obrázků.",
            documents: [],
        });
    }
};



exports.deleteImage = async(req, res) => {
    const imageId = req.params.imageId;
    try {
            const deletedImage = await prisma.productImage.delete({
                where:{
                    id:parseInt(imageId)
                }
            });
            if (!deletedImage) {
                return res.status(404).json({ msg: "Obrázek nebyl nalezen." });
            }
    
            return res.json({ message: `Obrázek byl úspěšně smazán.` });
        } catch (err) {
            console.error("Chyba při mazání obrázků:", err);
            return res.status(500).json({ message: "Nastala chyba při mazání obrázků." });
        }
};