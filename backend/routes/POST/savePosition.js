const savePosition = require('express').Router();
const modelPosition = require('../../models/positionModel');
const getCheckToken = require('../GET/getCheckToken');
const modelUser = require('../../models/userModel');
const modelStorage = require('../../models/storageModel');
savePosition.post("/save-position", getCheckToken, async(req, res) => {
   
    try {
        const userId = req.user.id;
        const { name } = req.body;
        
        const user = await modelUser.findOne( {_id:userId });
        const position = new modelPosition({
            name:name,
            storage:user.storage
        });

        const savedPosition = await position.save();

    
        const updatedStorage = await modelStorage.findOneAndUpdate(
            { _id: user.storage }, 
            { $push: { positions: savedPosition._id } }, 
            { new: true }
        );

       
        return res.json({
            msg: `Pozice ${savedPosition.name} byl úspěšně uložen.`,
            storage: updatedStorage
        });
    } catch (error) {
        console.error('Chyba při ukládání pozice:', error);
        return res.status(500).json({
            msg: "Bohužel nedošlo k uložení pozice."
        });
    }
});
   
module.exports = savePosition;