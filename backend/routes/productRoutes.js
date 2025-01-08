const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
// Nastavení routy
router.post('/save-product', authMiddleware.AuthAdmin, productController.createProduct);
router.put('/update-product/:productId', authMiddleware.AuthAdmin, productController.updateProduct);
router.get('/get-products', authMiddleware.AuthUser, productController.getProductsByCompany);
router.get('/get-searched-products', authMiddleware.AuthUser, productController.getSearchedProducts);
router.get('/get-storage-products/:storageId', authMiddleware.AuthAdmin, productController.getProductsByStorage);
router.get('/get-storage-products', authMiddleware.AuthUser, productController.getProductsByStorage);
router.get('/get-product/:productId', authMiddleware.AuthUser, productController.getProductDetail);
//router.get('/get-category/:categoryId', authMiddleware.AuthAdmin, categoryController.getCategoryDetail);
//router.delete('/delete-category/:categoryId', authMiddleware.AuthAdmin, categoryController.deleteCategory);

module.exports = router;