const mongoose = require('mongoose');
const user = new mongoose.Schema({
    email:{
        type:String,
        required: true, 
        unique: true
    },

    password:{
        type:String,
        required: true
    },

    isActive:{
        type:Boolean,
        default: false 
    },
    code:{
        type:Number
    },

    role:{
        type:String
    },
    storage:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Storage'
    },
});

module.exports = mongoose.model("User", user);