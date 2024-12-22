const prisma = require('../databaze/prisma');

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

exports.getProductStock = async(req, res) => {
    try {
            const productId = req.params.productId;
            if(!productId){
                return res.json({
                    message: "Chybí produkt ID"
                }); 
            }
            const product_stocks = await prisma.stockTransaction.findMany({
                where: {
                  productId: parseInt(productId),
                },
                include: {
                  movement: {
                    include: {
                      user: true,
                    },
                  },
                  storage: true,
                },
              });
            
            return res.json({
                message: "Úspěšně se nám podařilo získat naskladnění",
                documents: product_stocks
            });
        } catch (error) {
            console.error("Chyba při získávání naskladnění:", error);
            return res.status(500).json({
                message: "Bohužel nedošlo k získání naskladnění",
                documents: []
            });
        }
 };


exports.createMovement = async(req, res) => {
   try {
          let storage;
          const userId = req.user.id;
          const storageId = req.user.storageId;
        
          if(storageId){
            storage = storageId;
          }
          const { type, products} = req.body;
          const { stockStorageId, stockSupplierId, stockDescription, stockNumber,} = req.body.stockDetails;

          if(stockStorageId){
            storage = stockStorageId;
          }
        
          const newStocking = await prisma.stockMovement.create({
            data:{
                userId:userId,
                storageId:parseInt(storage),
                typeId:parseInt(type),
                date: new Date(),
                supplierId:parseInt(stockSupplierId),
                description:stockDescription,
                invoiceNumber:parseInt(stockNumber)
            }
          })
  
          const promises = products.map(async (stock) => {
              const { id, quantity, price } = stock;
  
              const stockTransaction = await prisma.stockTransaction.create({
                data:{
                    movementId:newStocking.id,
                    productId: parseInt(id),
                    quantity: parseInt(quantity),
                    price: parseInt(price),
                    storageId: parseInt(storage)
                }
              })
              
              const Stock = await prisma.stock.findFirst({
                where:{
                    productId:parseInt(id)
                }
              })

              if(Stock){
                const updateStock = await prisma.stock.update({
                    where:{
                        productId:parseInt(id)
                    },
                    data:{
                        quantity: {
                            increment: type === 2 ? -parseInt(quantity) : parseInt(quantity),
                        },
                    }
                })
              } else{
                const createStock = await prisma.stock.create({
                    data:{
                        storageId:parseInt(storage),
                        productId: parseInt(id),
                        quantity: type === 2 ? -parseInt(quantity) : parseInt(quantity),
                    }
                })
              }
          });
  
          await Promise.all(promises);
  
          return res.json({
              message: `Příjem zboží byl úspěšně uložen.`,
          });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Nastala chyba při ukládání příjmu zboží.", error: error.message });
      }
};
