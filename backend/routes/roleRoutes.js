const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');
// Nastavení routy

router.get('/get-roles', authMiddleware.AuthAdmin, roleController.getAllRoles);

module.exports = router;