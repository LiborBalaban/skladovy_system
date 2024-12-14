const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/save-warehouse', authMiddleware.AuthAdmin, warehouseController.createWarehouse);
router.put('/update-warehouse/:storageId', authMiddleware.AuthAdmin, warehouseController.updateWarehouse);
router.get('/get-warehouses', authMiddleware.AuthAdmin, warehouseController.getAllWarehouses);
router.get('/get-warehouse/:storageId', authMiddleware.AuthAdmin, warehouseController.getWarehouseDetail);

module.exports = router;