const prisma = require('../databaze/prisma');

exports.getAllCategories = async(req, res) => {
     try {
            const companyId = req.user.companyId;
            
            const categories = await prisma.category.findMany({
                where: {
                  companyId: companyId,
                },
              });
             
            if (!categories) {
                return res.status(404).json({ message: "Kategorie nebyly nalezeny." });
            }
            
            return res.json({
                message: "Úspěšně se nám podařilo získat kategorie",
                documents: categories
            });
        } catch (error) {
            console.error("Chyba při získávání kategorií:", error);
            return res.status(500).json({
                message: "Bohužel nedošlo k získání kategorií",
                documents: []
            });
        }
};


exports.getCategoryDetail = async(req, res) => {
     const categoryId = parseInt(req.params.categoryId);
     try {
        const category = await prisma.category.findUnique({
            where: {
              id:categoryId
            },
          });
         
        if (!category) {
            return res.status(404).json({ message: "Kategorie nebyla nalezena." });
        }
        
        return res.json({
            messgage: "Úspěšně se nám podařilo získat kategorii",
            documents: category
        });
    } catch (error) {
        console.error("Chyba při získávání kategore:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání kategorie",
            documents: []
        });
    }
};


exports.createCategory = async(req, res) => {
    const { categoryName, categoryDescription} = req.body;
    const companyId = req.user.companyId;

     if (!companyId) {
         return res.status(400).json({ message: "Chybí informace o ID společnosti." });
     }
 
     try{
         const category = await prisma.category.create({
             data:{
                 name:categoryName,
                 description:categoryDescription,
                 companyId:companyId,
             },
         })
 
         if(category){
             return res.status(200).json({ 
                message: `Kategorie ${category.name} byla úspěšně vytvořena.`
             });
         }
         else{
             res.status(500).json({ message: "Kategorie nebyla vytvořena." });  
         }
     }
     catch (error) {
         console.error("Chyba při vytváření kategorie:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při vytváření kategorie." });
     }
};


exports.updateCategory = async(req, res) => {
    const { categoryName, categoryDescription} = req.body;
    const companyId = req.user.companyId;
    const categoryId = parseInt(req.params.categoryId);

     if (!companyId) {
         return res.status(400).json({ message: "Chybí informace o ID společnosti." });
     }

     if (!categoryId) {
        return res.status(400).json({ message: "Chybí id kategorie." });
    }
 
     try{
         const category = await prisma.category.update({
            where:{
                id:categoryId
            },
            data:{
                 name:categoryName,
                 description:categoryDescription,
                 companyId:companyId,
             },
         })
 
         if(category){
             return res.status(200).json({ 
                     message: `Kategorie ${category.name} byla úspěšně aktualizována.`
             });
         }
         else{
             res.status(500).json({ message: "Kategorie nebyla aktualizována." });  
         }
     }
     catch (error) {
         console.error("Chyba při aktualizaci kategorie:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při aktualizaci kategorie." });
     }
  };



exports.deleteCategory = async(req, res) => {
    try {
            const categoryId = parseInt(req.params.categoryId);
    
            const deletedCategory = await prisma.category.delete({
                where:{
                    id:categoryId
                }
            });

            if (!deletedCategory) {
                return res.status(404).json({ message: "Kategorie nebyla nalezena." });
            }
    
            return res.json({ message: `Kategorie ${deletedCategory.name} byla úspěšně smazána.` });
        } catch (error) {
            console.error("Chyba při mazání kategorie:", error);
            return res.status(500).json({ message: "Nastala chyba při mazání kategorie." });
        }
};