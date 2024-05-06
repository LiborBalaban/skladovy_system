const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {

    try{
        mongoose.set('strict', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Databaze běží na ${conn.connection.host}`);
    } catch{
        console.log("Databáze negunguje");
    }

}

module.exports = connectDB;