const mongoose = require('mongoose');
const product_stock = new mongoose.Schema({
    stockin:{
        type: mongoose.Schema.Types.ObjectId, ref: 'StockIn' 
    },

    product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
    },

    quantity: {
        type: Number
    }
});

module.exports = mongoose.model("Product_Stock", product_stock);