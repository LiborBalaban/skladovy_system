const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
// Nastavení routy
router.post('/save-category', authMiddleware.AuthAdmin, categoryController.createCategory);
router.put('/update-category/:categoryId', authMiddleware.AuthAdmin, categoryController.updateCategory);
router.get('/get-categories', authMiddleware.AuthUser, categoryController.getAllCategories);
router.get('/get-category/:categoryId', authMiddleware.AuthAdmin, categoryController.getCategoryDetail);
router.delete('/delete-category/:categoryId', authMiddleware.AuthAdmin, categoryController.deleteCategory);

module.exports = router;