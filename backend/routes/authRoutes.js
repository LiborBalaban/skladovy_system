const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Nastavení routy
router.get('/auth-user', authMiddleware.AuthUser , authController.AuthRoute);

module.exports = router;