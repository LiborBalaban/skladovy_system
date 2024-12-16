const prisma = require('../databaze/prisma');

exports.getPositionDetail = async(req, res) => {
    const positionId = parseInt(req.params.positionId);
     try {
        const position = await prisma.position.findUnique({
            where: {
              id:positionId
            },
          });
         
        if (!position) {
            return res.status(404).json({ message: "Pozice nebyla nalezena." });
        }
        
        return res.json({
            messgage: "Úspěšně se nám podařilo získat pozice",
            documents: position
        });
    } catch (error) {
        console.error("Chyba při získávání pozice:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání pozice",
            documents: []
        });
    }
};

exports.getPositionsById = async(req, res) => {
    const storageId = req.user.storageId;

    if (!storageId) {
        return res.status(404).json({ message: "Chybí ID skladu." });
    }

     try {
        const positions = await prisma.position.findMany({
            where: {
              storageId:storageId
            },
          });
         
        if (!positions) {
            return res.status(404).json({ message: "Pozice nebyla nalezena." });
        }
        
        return res.json({
            messgage: "Úspěšně se nám podařilo získat pozice",
            documents: positions
        });
    } catch (error) {
        console.error("Chyba při získávání pozice:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání pozice",
            documents: []
        });
    }
};

exports.getAllPositions = async(req, res) => {
    try {
        const companyId = req.user.companyId;
        
        const positions = await prisma.position.findMany({
            where: {
                storage: {
                  company: {
                    id: companyId,
                  },
                },
              },
          });
         
        if (!positions) {
            return res.status(404).json({ message: "Pozice nebyly nalezeny." });
        }
        
        return res.json({
            message: "Úspěšně se nám podařilo získat pozice",
            documents: positions
        });
    } catch (error) {
        console.error("Chyba při získávání pozic:", error);
        return res.status(500).json({
            message: "Bohužel nedošlo k získání pozic",
            documents: []
        });
    }
 };



exports.createPosition = async(req, res) => {
    const { positionName, storageId} = req.body;
     
    try{
         const position = await prisma.position.create({
             data:{
                 name:positionName,
                 storageId:parseInt(storageId)
             },
         })
 
         if(position){
             return res.status(200).json({ 
                message: `Pozice ${position.name} byla úspěšně vytvořena.`
             });
         }
         else{
             res.status(500).json({ message: "Pozice nebyla vytvořena." });  
         }
     }
     catch (error) {
         console.error("Chyba při vytváření pozice:", error);
         res.status(500).json({ message: "Bohužel došlo k chybě při vytváření pozice." });
     }
};



exports.deletePosition = async(req, res) => {
    try {
        const positionId = parseInt(req.params.positionId);

        const deletedPosiotion = await prisma.position.delete({
            where:{
                id:positionId
            }
        });

        if (!deletedPosiotion) {
            return res.status(404).json({ message: "Pozice nebyla nalezena." });
        }

        return res.json({ message: `Pozice ${deletedPosiotion.name} byla úspěšně smazána.` });
    } catch (error) {
        console.error("Chyba při mazání kategorie:", error);
        return res.status(500).json({ message: "Nastala chyba při mazání pozice." });
    }
};