const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const imageController = require('../controllers/ImagesController');
const authMiddleware = require('../middlewares/authMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
// Nastavení routy
router.post('/upload-images', authMiddleware.AuthAdmin, multerMiddleware , imageController.uploadImage);
router.get('/get-images/:productId', authMiddleware.AuthUser, imageController.getAllImages);
router.delete('/delete-image/:imageId', authMiddleware.AuthAdmin, imageController.deleteImage);
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
module.exports = router;