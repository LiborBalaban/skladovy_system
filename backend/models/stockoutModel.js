const mongoose = require('mongoose');
const stock_out = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true, 
    },
    
    description: {
        type: String
    },

    storage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage' 
    }
,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
});

module.exports = mongoose.model("StockOut", stock_out);