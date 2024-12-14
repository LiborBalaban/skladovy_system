const prisma = require('../databaze/prisma');

exports.getAllSuppliers = async(req, res) => {
    try {
        const companyId = req.user.companyId;
        
        const suppliers = await prisma.supplier.findMany({
            where: {
              companyId: companyId,
            },
          });
         
        if (!suppliers) {
            return res.status(404).json({ message: "Dodavatelé nebyli nalezeni." });
        }
        
        return res.json({
            message: "Úspěšně se nám podařilo získat dodavatele",
            documents: suppliers
        });
    } catch (error) {
        console.error("Chyba při získávání dodavatelů", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání dodavatelů",
            documents: []
        });
    }
};

exports.getSupplierDetail = async(req, res) => {
    const supplierId = parseInt(req.params.supplierId);
    try {
       const supplier = await prisma.supplier.findUnique({
           where: {
             id:supplierId
           },
         });
        
       if (!supplier) {
           return res.status(404).json({ message: "Dodavatel nebyl nalezen." });
       }
       
       return res.json({
           messgage: "Úspěšně se nám podařilo získat dodavatele",
           documents: supplier
       });

   } catch (error) {
       console.error("Chyba při získávání dodavatele:", error);
       return res.status(500).json({
           message: "Bohužel nedošlo k získání dodavatele",
           documents: []
       });
   }
};


exports.createSupplier = async(req, res) => {
    const { supplierName, supplierPhone, supplierEmail , supplierDescription} = req.body;
    const supplierPhoneInt = parseInt(supplierPhone);
    const companyId = req.user.companyId;

     if (!companyId) {
         return res.status(400).json({ message: "Chybí informace o ID společnosti." });
     }
 
     try{
         const supplier = await prisma.supplier.create({
             data:{
                 name:supplierName,
                 phone: supplierPhoneInt,
                 email: supplierEmail,
                 description:supplierDescription,
                 companyId:companyId,
             },
         })
 
         if(supplier){
             return res.status(200).json({ 
                     message: `Dodavatel ${supplier.name} byla úspěšně vytvořen.`
             });
         }
         else{
             res.status(500).json({ message: "Dodavatel nebyl vytvořen." });  
         }
     }
     catch (error) {
         console.error("Chyba při vytváření dodavatele:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při vytváření dodavatele." });
     }
};

exports.updateSupplier = async(req, res) => {
    const { supplierName, supplierPhone, supplierEmail , supplierDescription} = req.body;
    const supplierPhoneInt = parseInt(supplierPhone);
    const companyId = req.user.companyId;
    const supplierId = parseInt(req.params.supplierId);

     if (!companyId) {
         return res.status(400).json({ message: "Chybí informace o ID společnosti." });
     }
 
     try{
         const supplier = await prisma.supplier.update({
            where:{
                id:supplierId
            },
             data:{
                 name:supplierName,
                 phone: supplierPhoneInt,
                 email: supplierEmail,
                 description:supplierDescription,
                 companyId:companyId,
             },
         })
 
         if(supplier){
             return res.status(200).json({ 
                     message: `Dodavatel ${supplier.name} byla úspěšně aktualizován.`
             });
         }
         else{
             res.status(500).json({ message: "Dodavatel nebyl aktualizován." });  
         }
     }
     catch (error) {
         console.error("Chyba při aktualizování dodavatele:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při aktualizování dodavatele." });
     }
};

exports.deleteSupplier = async(req, res) => {
     try {
           const supplierId = parseInt(req.params.supplierId);

           const deletedSupplier = await prisma.supplier.delete({
            where:{
                id:supplierId
            }
           });
           
           if (!deletedSupplier) {
               return res.status(404).json({ msg: "Dodavatel nebyl nalezen." });
           }
   
           return res.json({ message: `Dodavatel ${deletedSupplier.name} byl úspěšně smazán.` });
       } catch (err) {
           // Zachycení a zpracování chyby
           console.error("Chyba při mazání dodavatele:", err);
           return res.status(500).json({ message: "Nastala chyba při mazání dodavatele." });
       }
};