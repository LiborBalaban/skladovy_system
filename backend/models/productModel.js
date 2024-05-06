const mongoose = require('mongoose');
const product = new mongoose.Schema({
    name:{
        type:String,
        required: true, 
    },

    code:{
        type:String,
        required: true,
        unique: true
    },

    category:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
    },
    
    description:{
        type:String
    },

    quantity:{
        type:Number,
        default: 0 
    },
    
    storage:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Storage' 
    },


});

module.exports = mongoose.model("Product", product);