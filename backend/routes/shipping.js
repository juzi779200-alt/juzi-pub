const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');
const auth = require('../middleware/auth');

router.post('/', auth, shippingController.createShipping);
router.get('/order/:orderId', auth, shippingController.getShippingByOrderId);
router.put('/:shippingId/status', auth, shippingController.updateShippingStatus);
router.get('/all', auth, shippingController.getAllShipping);
router.get('/track/:trackingNumber', shippingController.trackByNumber);

module.exports = router;
