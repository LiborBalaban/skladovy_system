const mongoose = require('mongoose');
const stock_in = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true, 
    },

    document: {
        type: Number,
        unique: true, // Toto pole bude unikátní
        required: true,
    },

    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        onDelete:'cascade' 
    },
    
    description: {
        type: String
    },

    storage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage' 
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    }
});

module.exports = mongoose.model("StockIn", stock_in);