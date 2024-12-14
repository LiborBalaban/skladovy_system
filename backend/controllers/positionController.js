const positionModel = require('../../models/positionModel');
const userModel = require('../../models/userModel');

exports.getPositionDetail = async(req, res) => {
   try {
       const userId = req.user.id;
       const user = await userModel.findById(userId).populate('storage').populate({
           path: 'storage',
               populate: {
                   path: 'positions',
                   model: 'Position'
               }
       });
       if (!user) {
           return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
       }
       
       return res.json({
           msg: "Úspěšně se nám podařilo získat pozice",
           documents: user.storage.positions
       });
   } catch (error) {
       console.error("Chyba při získávání pozic:", error);
       return res.status(500).json({
           msg: "Bohužel nedošlo k získání pozic",
           documents: [],
       });
   }
};

exports.getAllPositions = async(req, res) => {
    try {
            const storageId = req.params.storageId;
            const positions = await Position.find({ storage: storageId });
            return res.json({
                msg: "Úspěšně se nám podařilo získat pozice",
                documents: positions
            });
        } catch (err) {
            console.error("Chyba při získávání pozic:", err);
            return res.status(500).json({
                msg: "Bohužel nedošlo k získání pozic",
                documents: []
            });
        }
 };



exports.createPosition = async(req, res) => {
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
};



exports.deletePosition = async(req, res) => {
   
};