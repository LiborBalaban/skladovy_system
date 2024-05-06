const mongoose = require('mongoose');
const productImage = new mongoose.Schema({
    url:{
        type:String,
        required: true, 
    },

    product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
    },
});

module.exports = mongoose.model("ProductImage", productImage);