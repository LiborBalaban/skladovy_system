const prisma = require('../databaze/prisma');

exports.getAllMovements = async (req, res) => {
    try {
      const companyId = req.user.companyId;
  
      const movements = await prisma.stockMovement.findMany({
        where: {
          user: {
            companyId: companyId,
          },
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          supplier:{
            select:{
                name:true
            }
          },
          storage:{
            select:{
                name:true
            }
          },
          stockTransaction:{
            select:{
                id:true
            }
          }
        },
      });
  
      return res.json({
        message: "Úspěšně se nám podařilo získat pohyby uživatelů",
        documents: movements,
      });
    } catch (error) {
      console.error("Chyba při získávání pohybů:", error);
      return res.status(500).json({
        message: "Bohužel nedošlo k získání pohybů",
        documents: [],
      });
    }
  };

  exports.getMovementsByUser = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const movements = await prisma.stockMovement.findMany({
        where: {
          user: {
            id:userId
          },
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          supplier:{
            select:{
                name:true
            }
          },
          storage:{
            select:{
                name:true
            }
          },
          stockTransaction:{
            select:{
                id:true
            }
          }
        },
      });
  
      return res.json({
        message: "Úspěšně se nám podařilo získat pohyby uživatelů",
        documents: movements,
      });
    } catch (error) {
      console.error("Chyba při získávání pohybů:", error);
      return res.status(500).json({
        message: "Bohužel nedošlo k získání pohybů",
        documents: [],
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
                      user: {
                        select:{
                          name:true
                        }
                      },
                      supplier:{
                        select:{
                          name:true
                        }
                      },
                      storage:{
                        select:{
                          name:true
                        }
                      }
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

 exports.getProductStockStorage = async(req, res) => {
  try {
          const productId = req.params.productId;
          const storageId = req.user.storageId;
          if(!productId){
              return res.json({
                  message: "Chybí produkt ID"
              }); 
          }
          const product_stocks = await prisma.stockTransaction.findMany({
              where: {
                productId: parseInt(productId),
                storageId: storageId
              },
              include: {
                movement: {
                  include: {
                    user: {
                      select:{
                        name:true
                      }
                    },
                    supplier:{
                      select:{
                        name:true
                      }
                    },
                    storage:{
                      select:{
                        name:true
                      }
                    }
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
          const { typeMovement, products} = req.body;
          const { stockStorageId, stockSupplierId, stockDescription, stockNumber,} = req.body.stockDetails;

          if(stockStorageId){
            storage = stockStorageId;
          }
        
          const newStocking = await prisma.stockMovement.create({
            data:{
                userId:userId,
                storageId:parseInt(storage),
                typeId:parseInt(typeMovement),
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
                    productId:parseInt(id),
                    storageId:parseInt(storage)
                }
              })

              if(Stock){
                const updateStock = await prisma.stock.update({
                    where: { id: Stock.id }, // `id` z dříve získaného záznamu
                    data: {
                      quantity: {
                        increment: typeMovement === 2 ? -parseInt(quantity) : parseInt(quantity),
                      },
                    }
                  });
              } else{
                const createStock = await prisma.stock.create({
                    data:{
                        storageId:parseInt(storage),
                        productId: parseInt(id),
                        quantity: typeMovement === 2 ? -parseInt(quantity) : parseInt(quantity),
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
