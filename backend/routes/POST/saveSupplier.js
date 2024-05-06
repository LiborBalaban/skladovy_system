const saveSupplier = require('express').Router();
const modelSupplier = require('../../models/supplierModel');
const getCheckToken = require('../GET/getCheckToken');
const modelStorage = require('../../models/storageModel');
const modelUser= require('../../models/userModel');

saveSupplier.post("/save-supplier", getCheckToken, async(req, res) => {
    try {
        const userId = req.user.id;
        const { name, phone, email, description } = req.body;
        
        const supplier = new modelSupplier({
            name:name,
            phone:phone,
            email:email,
            description:description
        });

    
        const savedSupplier = await supplier.save();

        const user = await modelUser.findOne( {_id:userId });
    
        const updatedStorage = await modelStorage.findOneAndUpdate(
            { _id: user.storage }, 
            { $push: { supplier: savedSupplier._id } }, 
            { new: true }
        );

       
        return res.json({
            msg: `Dodavatel ${savedSupplier.name} byl úspěšně uložen.`,
            storage: updatedStorage
        });
    } catch (error) {
        console.error('Chyba při ukládání dodavatele:', error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k uložení dodavatele."
        });
    }
});

module.exports = saveSupplier;