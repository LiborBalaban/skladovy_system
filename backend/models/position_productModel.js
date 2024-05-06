const mongoose = require('mongoose');
const product_position = new mongoose.Schema({
    
    position:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Position' 
    },

    product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
    },

});

module.exports = mongoose.model("Product_Position", product_position);