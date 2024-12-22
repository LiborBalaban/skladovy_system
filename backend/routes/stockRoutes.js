const express = require('express');
const router = express.Router();

const movementController = require('../controllers/movementsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/save-stock', authMiddleware.AuthUser, movementController.createMovement);
router.get('/get-movements/:productId', authMiddleware.AuthUser, movementController.getProductStock);


module.exports = router;