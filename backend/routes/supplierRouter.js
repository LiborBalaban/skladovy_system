const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplierController');
const authMiddleware = require('../middlewares/authMiddleware');
// Nastavení routy
router.post('/save-supplier', authMiddleware.AuthAdmin, supplierController.createSupplier);
router.put('/update-supplier/:supplierId', authMiddleware.AuthAdmin, supplierController.updateSupplier);
router.get('/get-suppliers', authMiddleware.AuthUser, supplierController.getAllSuppliers);
router.get('/get-supplier/:supplierId', authMiddleware.AuthAdmin, supplierController.getSupplierDetail);
router.delete('/delete-supplier/:supplierId', authMiddleware.AuthAdmin, supplierController.deleteSupplier);

module.exports = router;