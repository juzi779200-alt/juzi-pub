const express = require('express');
const router = express.Router();
const paypalService = require('../services/paypalService');

router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'USD', description = '' } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const order = await paypalService.createOrder(amount, currency, description);
    
    res.json({
      success: true,
      orderId: order.id,
      approvalLink: order.links.find(link => link.rel === 'approve')?.href
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order' 
    });
  }
});

router.post('/capture-order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const captureData = await paypalService.captureOrder(orderId);
    
    res.json({
      success: true,
      captureData
    });
  } catch (error) {
    console.error('Capture order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to capture order' 
    });
  }
});

router.get('/order-details/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const orderDetails = await paypalService.getOrderDetails(orderId);
    
    res.json({
      success: true,
      orderDetails
    });
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get order details' 
    });
  }
});

router.post('/webhook', async (req, res) => {
  try {
    const webhookData = req.body;
    
    console.log('PayPal webhook received:', webhookData);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
