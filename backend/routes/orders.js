const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/user', auth, orderController.getUserOrders);
router.get('/:orderId', auth, orderController.getOrderById);
router.put('/:orderId/status', auth, orderController.updateOrderStatus);
router.get('/all', auth, orderController.getAllOrders);

module.exports = router;
