const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Nastavení routy
router.post('/save-user', userController.registrationUser);
router.post('/activate-user/:token', userController.verification);
router.post('/login-user', userController.loginUser);
router.post('/invite-employee', authMiddleware.AuthAdmin, userController.crateEmployee);
router.post('/save-employee', userController.registrationEmployee);
router.get('/get-users', authMiddleware.AuthAdmin , userController.getUsers);
router.get('/get-user/:userId', authMiddleware.AuthAdmin, userController.getUser);

module.exports = router;