const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storages = new mongoose.Schema({
    
    name:{
        type:String,
        require:true
    },

    phone:{
        type:Number,
        require:true
    },

    address:{
        type:String,
        require:true
    },

    psc:{
        type:Number,
        require:true
    },

    city:{
        type:String,
        require:true
    },

    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], 
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }], 
    stockin: [{ type: Schema.Types.ObjectId, ref: 'Product_Stock' }], 
    stockout: [{ type: Schema.Types.ObjectId, ref: 'Product_StockOut' }],
    supplier: [{ type: Schema.Types.ObjectId, ref: 'Supplier' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],    
    positions: [{ type: Schema.Types.ObjectId, ref: 'Positions' }],    

});

module.exports = mongoose.model("Storage", storages);