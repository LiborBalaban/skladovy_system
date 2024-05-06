const mongoose = require('mongoose');
const employee = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    surname:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true,
    },

    password:{
        type:String,
        require:true,
    },

    phone:{
        type:String,
        require:true,
    },
    
    storage_id:{
         type: mongoose.Schema.Types.ObjectId, ref: 'Storage' 
    },
    role:{
        type:String,
        require:true,
    }   
});

module.exports = mongoose.model("Employee", employee);