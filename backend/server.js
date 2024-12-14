require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./databaze/connect');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const warehouseRouter = require('./routes/warehouseRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const supplierRouter = require('./routes/supplierRouter');
const roleRouter = require('./routes/roleRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
//connectDB();

// Middleware pro zpracování cookies a těla požadavku
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
// Nastavení CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: "PUT, POST, GET, DELETE, PATCH, OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));


app.use('/', cors(corsOptions), userRouter);
app.use('/', cors(corsOptions), authRouter);
app.use('/', cors(corsOptions), warehouseRouter);
app.use('/', cors(corsOptions), categoryRouter);
app.use('/', cors(corsOptions), supplierRouter);
app.use('/', cors(corsOptions), roleRouter);

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}!`);
});