const express = require('express');
const router = express.Router();

const movementController = require('../controllers/movementsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/save-stock', authMiddleware.AuthUser, movementController.createMovement);
router.get('/get-movements/:productId', authMiddleware.AuthAdmin, movementController.getProductStock);
router.get('/get-movements-storage/:productId', authMiddleware.AuthUser, movementController.getProductStockStorage);
router.get('/get-all-movements', authMiddleware.AuthAdmin, movementController.getAllMovements);
router.get('/get-user-movements', authMiddleware.AuthUser, movementController.getMovementsByUser);


module.exports = router;