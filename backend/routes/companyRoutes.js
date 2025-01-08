const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');
// Nastavení routy
router.put('/update-company', authMiddleware.AuthAdmin, companyController.updateCompany);
router.get('/get-company', authMiddleware.AuthUser, companyController.getCompanyDetail);
router.get('/get-company-name', authMiddleware.AuthUser, companyController.getCompanyName);

module.exports = router;