const mongoose = require('mongoose');
const product_stockout = new mongoose.Schema({
    stockout:{
        type: mongoose.Schema.Types.ObjectId, ref: 'StockOut' 
    },

    product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
    },

    quantity: {
        type: Number
    }
});

module.exports = mongoose.model("Product_StockOut", product_stockout);