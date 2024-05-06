require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./databaze/connect');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const saveCategory = require('./routes/POST/saveCategory');
const getCategories = require('./routes/GET/getCategory');
const deleteCategory = require('./routes/POST/deleteCategory');
const getCategoryInfo = require('./routes/GET/getCategoryInfo');
const updateCategory = require('./routes/POST/updateCategory');
const saveStorage = require('./routes/POST/saveStorage');
const getStorages = require('./routes/GET/getStorages');
const getStorage = require('./routes/GET/getStorageInfo');
const uptadeStorage = require('./routes/POST/updateStorage');
const saveSupplier = require('./routes/POST/saveSupplier');
const getSuppliers = require('./routes/GET/getSuppliers');
const deleteSupplier = require('./routes/POST/deleteSupplier');
const updateSupplier = require('./routes/POST/updateSupplier');
const getSuppliersInfo = require('./routes/GET/getSuppliersInfo');
const saveUser = require('./routes/POST/saveUser');
const activateUser = require('./routes/POST/activateUser');
const login = require('./routes/POST/login');
const saveEmployee = require('./routes/POST/saveEmployee');
const getEmployee = require('./routes/GET/getEmployee');
const saveProduct = require('./routes/POST/saveProduct');
const uploadImage = require('./routes/POST/uploadImage');
const getProductImages = require('./routes/GET/getProductImages');
const getProducts = require('./routes/GET/getProducts');
const getProductInfo = require('./routes/GET/getProductInfo');
const getPositions = require('./routes/GET/getPositions');
const savePosition = require('./routes/POST/savePosition');
const getPositionsByID = require('./routes/GET/getPositionsByID');
const saveStockIn = require('./routes/POST/saveStockIn');
const getStockIn = require('./routes/GET/getStockin');
const getStockOut = require('./routes/GET/getStockOut');
const saveStockOut = require('./routes/POST/saveStockOut');
const updateProduct = require('./routes/POST/updateProduct');
const getUserEmail = require('./routes/GET/getUserEmail');
const getStoragebyId = require('./routes/GET/getStoragebyId')
const deleteProduct = require('./routes/POST/deteleProduct');
const authRoutes = require('./routes/GET/authRoutes');
const searchedProduct = require('./routes/GET/getSearchedProduct');
const getProductStockIn  = require('./routes/GET/getProductStockin');
const getProductStockOut  = require('./routes/GET/getProductStockOut');
const sendPasswordEmail = require('./routes/POST/postResetPasswordEmail');
const resetPassword = require('./routes/POST/resetPassword');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

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


/*
** Routy - GET
*/ 
app.use("/", cors(corsOptions), getCategories);
app.use("/", getCategoryInfo);
app.use("/", getStorages);
app.use("/", cors(corsOptions), getStorage);
app.use("/", cors(corsOptions), getSuppliers);
app.use("/", getSuppliersInfo);
app.use("/", getEmployee);
app.use("/", getProductImages);
app.use("/", cors(corsOptions), getProducts);
app.use("/", cors(corsOptions), getProductInfo);
app.use("/", cors(corsOptions), getPositions);
app.use("/", cors(corsOptions), getPositionsByID);
app.use("/", cors(corsOptions), getStockIn);
app.use("/", cors(corsOptions), getStockOut);
app.use("/", cors(corsOptions), authRoutes);
app.use("/", cors(corsOptions), getUserEmail);
app.use("/", cors(corsOptions), getStoragebyId);
app.use("/", cors(corsOptions), searchedProduct);
app.use("/", cors(corsOptions), getProductStockIn);
app.use("/", cors(corsOptions), getProductStockOut);

/*
Routy - POST
*/ 
app.use("/", cors(corsOptions), saveCategory);
app.use("/", cors(corsOptions), deleteCategory);
app.use("/", cors(corsOptions), updateCategory);
app.use("/", cors(corsOptions), saveStorage);
app.use("/", cors(corsOptions), uptadeStorage);
app.use("/", cors(corsOptions), saveSupplier);
app.use("/", cors(corsOptions), deleteSupplier);
app.use("/", cors(corsOptions), updateSupplier);
app.use("/", cors(corsOptions), saveUser);
app.use("/", cors(), login);
app.use("/", cors(corsOptions), saveEmployee);
app.use("/", activateUser);
app.use("/", resetPassword);
app.use("/", cors(corsOptions), saveProduct);
app.use("/", cors(corsOptions), uploadImage);
app.use("/", cors(corsOptions), savePosition);
app.use("/", cors(corsOptions), saveStockIn);
app.use("/", cors(corsOptions), saveStockOut);
app.use("/", cors(corsOptions), updateProduct);
app.use("/", cors(corsOptions), deleteProduct);
app.use("/", sendPasswordEmail);

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}!`);
});