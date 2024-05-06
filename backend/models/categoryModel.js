const mongoose = require('mongoose');
const categories = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    description:{
        type:String,
        require:true,
    },

    position:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Position' 
   },
});

module.exports = mongoose.model("Category", categories);