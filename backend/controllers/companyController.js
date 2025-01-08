const prisma = require('../databaze/prisma');

exports.getCompanyDetail = async(req, res) => {
     const companyId = req.user.companyId;
     try {
        const company = await prisma.company.findUnique({
            where: {
              id:companyId
            },
          });
         
        if (!company) {
            return res.status(404).json({ message: "Firma nebyla nalezena." });
        }
        
        return res.json({
            messgage: "Úspěšně se nám podařilo získat firmu",
            documents: company
        });
    } catch (error) {
        console.error("Chyba při získávání firmy:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání firmy",
            documents: []
        });
    }
};

exports.getCompanyName = async(req, res) => {
    const companyId = req.user.companyId;
    try {
       const company = await prisma.company.findUnique({
           where: {
             id:companyId
           },
           select:{
            name:true
           }
         });
        
       if (!company) {
           return res.status(404).json({ message: "Firma nebyla nalezena." });
       }
       
       return res.json({
           messgage: "Úspěšně se nám podařilo získat firmu",
           documents: company
       });
   } catch (error) {
       console.error("Chyba při získávání firmy:", error);
       return res.status(500).json({
           message: "Bohužel nedošlo k získání firmy",
           documents: []
       });
   }
};


exports.updateCompany = async(req, res) => {
    const { companyName, companyEmail, companyPhone, companyAddress, companyZip, companyCity} = req.body;
    const companyId = req.user.companyId;

     if (!companyId) {
         return res.status(400).json({ message: "Chybí informace o ID společnosti." });
     }

     try{
         const company = await prisma.company.update({
            where:{
                id:companyId
            },
            data:{
                 name:companyName,
                 email:companyEmail,
                 address:companyAddress,
                 psc:parseInt(companyZip),
                 city:companyCity,
                 phone:companyPhone
             },
         })
 
         if(company){
             return res.status(200).json({ 
                     message: `Firma ${company.name} byla úspěšně aktualizována.`
             });
         }
         else{
             res.status(500).json({ message: "Firma nebyla aktualizována." });  
         }
     }
     catch (error) {
         console.error("Chyba při aktualizaci Firmy:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při aktualizaci firmy." });
     }
  };


