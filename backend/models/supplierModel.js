const mongoose = require('mongoose');
const supplier = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    phone:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true,
    },

    description:{
        type:String,
        require:true,
    },
});

module.exports = mongoose.model("Supplier", supplier);