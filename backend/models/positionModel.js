const mongoose = require('mongoose');
const position = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    storage:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Storage' 
    },

    product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
    },
});

module.exports = mongoose.model("Position", position);