const userModel = require('../../models/userModel');

exports.getAllMovements = async(req, res) => {
   try {
           const userId = req.user.id;
           
           const user = await userModel.findOne({_id: userId})
               .populate({
                   path: 'storage',
                   populate: {
                       path: 'stockin',
                       model: 'Product_Stock',
                       populate: {
                           path: 'stockin',
                           model: 'StockIn',
                           populate: {
                               path: 'supplier',
                               model: 'Supplier'
                           }
                       }
                   }
               }) .populate({
                   path: 'storage',
                   populate: {
                       path: 'stockin',
                       model: 'Product_Stock',
                       populate: {
                           path: 'product',
                           model: 'Product',
                       }
                   }
               })
           
           if (!user) {
               return res.status(404).json({ msg: "Uživatel nebyl nalezen." });
           }
   
           const stockin = user.storage.stockin;
   
           return res.json({
               msg: "Úspěšně se nám podařilo získat naskladnění",
               documents: stockin
           });
       } catch (error) {
           console.error("Chyba při získávání naskladnění:", error);
           return res.status(500).json({
               msg: "Bohužel nedošlo k získání naskladnění",
               documents: []
           });
       }
};


exports.createMovement = async(req, res) => {
   try {
          const userId = req.user.id;
          const user = await userModel.findOne({ _id: userId });
          const storageId = user.storage;
  
          const { document, supplier, description, stockData } = req.body;
  
          const newStocking = new modelStockIn({
              document: document,
              supplier: supplier,
              description: description,
              storage: storageId,
              user: userId
          });
          await newStocking.save();
  
          const newProductStockIds = [];
          const promises = stockData.map(async (stock) => {
              const { productId, quantity } = stock;
  
              const stockinProduct = new modelProductStockin({
                  product: productId,
                  stockin: newStocking._id,
                  quantity: quantity
              });
              const savedStockinProduct = await stockinProduct.save();
              newProductStockIds.push(savedStockinProduct._id);
  
              const product = await productModel.findById(productId);
              if (product) {
                  product.quantity += parseInt(quantity);
                  await product.save();
              }
          });
  
          await Promise.all(promises);
  
          const updatedStorage = await storageModel.findByIdAndUpdate(
              storageId,
              { $push: { stockin: { $each: newProductStockIds } } },
              { new: true }
          );
  
          return res.json({
              msg: `Příjem zboží byl úspěšně uložen.`,
          });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: "Nastala chyba při ukládání příjmu zboží.", error: error.message });
      }
};
