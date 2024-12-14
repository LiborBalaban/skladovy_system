const prisma = require('../databaze/prisma');

exports.getAllWarehouses = async(req, res) => {
    const companyId = req.user.companyId;

    if (!companyId) {
        return res.status(400).json({ message: "Chybí informace o ID společnosti." });
    }

    try{
        const storages = await prisma.storage.findMany({
            where:{
                companyId:companyId
            }
        })

        if(storages && storages.length > 0){
            return res.status(200).json({ documents: storages });
        }
        else{
            res.status(500).json({ message: "Žádné sklady nebyly nalezeny." });  
        }
    }
    catch (error) {
        console.error("Chyba při hledání skladů:", error);
        res.status(500).json({ message: "Bohužel došlo k chybě při hledání skladů." });
    }
};

exports.getWarehouseDetail = async(req, res) => {
    const companyId = req.user.companyId;
    const storageId = parseInt(req.params.storageId);
    

    if (!companyId) {
        return res.status(400).json({ message: "Chybí informace o ID společnosti." });
    }

    if(!storageId){
        return res.status(400).json({ message: "Chybí informace o ID skladu." }); 
    }

    try{
        const storage = await prisma.storage.findUnique({
            where:{
                id:storageId
            }
        })

        if(storage){
            return res.status(200).json({ documents: storage });
        }
        else{
            res.status(500).json({ message: "Žádné sklady nebyly nalezeny." });  
        }
    }
    catch (error) {
        console.error("Chyba při hledání skladů:", error);
        res.status(500).json({ message: "Bohužel došlo k chybě při hledání skladů." });
    }
};


exports.createWarehouse = async(req, res) => {
   const { warehouseName, warehousePhone, warehouseAddress, warehouseZip, warehouseCity} = req.body;
   const companyId = req.user.companyId;
   const warehousePhoneInt = parseInt(warehousePhone);
   const warehouseZipInt = parseInt(warehouseZip);
       
    if (!companyId) {
        return res.status(400).json({ message: "Chybí informace o ID společnosti." });
    }

    try{
        const storage = await prisma.storage.create({
            data:{
                name:warehouseName,
                phone:warehousePhoneInt,
                address:warehouseAddress,
                psc:warehouseZipInt,
                city:warehouseCity,
                companyId:companyId,
            },
        })

        if(storage){
            return res.status(200).json({ 
                documents: {
                    message: `Sklad ${storage.name} byl úspěšně vytvořen.`
                }
            });
        }
        else{
            res.status(500).json({ message: "Sklad nebyl vytvořen." });  
        }
    }
    catch (error) {
        console.error("Chyba při vytváření skladů:", error);
        res.status(500).json({ message: "Bohužel došlo k chybě při vytváření skladů." });
    }
};

exports.updateWarehouse = async(req, res) => {
    const storageId = parseInt(req.params.storageId);
    const companyId = req.user.companyId;
    const { warehouseName, warehousePhone, warehouseAddress, warehouseZip, warehouseCity} = req.body;
    const warehousePhoneInt = parseInt(warehousePhone);
    const warehouseZipInt = parseInt(warehouseZip);
       
    if (!storageId) {
        return res.status(400).json({ message: "Chybí informace o ID skladu." });
    }

    if (!companyId) {
        return res.status(400).json({ message: "Chybí informace o ID společnosti." });
    }

    try{
        const storage = await prisma.storage.update({
            where: {
              id: storageId, // Unikátní identifikátor skladu
            },
            data: {
              name: warehouseName,
              phone: warehousePhoneInt,
              address: warehouseAddress,
              psc: warehouseZipInt,
              city: warehouseCity,
              companyId: companyId, // Může být volitelné, pokud se nemění
            },
          });

        if(storage){
            return res.status(200).json({
                    message: `Sklad ${storage.name} byl úspěšně aktualizován.`
            });
        }
        else{
            res.status(500).json({ message: "Sklad nebyl aktualizován." });  
        }
    }
    catch (error) {
        console.error("Chyba při aktualizace skladu:", error);
        res.status(500).json({ message: "Bohužel došlo k chybě při aktualizaci skladu." });
    }
};

exports.deleteWarehouse = async(req, res) => {
   
};