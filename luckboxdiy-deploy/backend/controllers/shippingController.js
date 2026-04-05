const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

exports.createShipping = async (req, res) => {
  try {
    const { 
      orderId, 
      trackingNumber, 
      carrier,
      estimatedDelivery,
      notes 
    } = req.body;
    
    const shippingId = uuidv4();
    
    await db.promise().query(
      'INSERT INTO shipping (id, order_id, tracking_number, carrier, status, estimated_delivery, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [shippingId, orderId, trackingNumber, carrier, 'pending', estimatedDelivery, notes]
    );
    
    await db.promise().query(
      'UPDATE orders SET status = ? WHERE id = ?',
      ['shipped', orderId]
    );
    
    res.status(201).json({
      message: 'Shipping created successfully',
      shipping: {
        id: shippingId,
        orderId,
        trackingNumber,
        carrier,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Create shipping error:', error);
    res.status(500).json({ message: 'Server error during shipping creation' });
  }
};

exports.getShippingByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const [shipping] = await db.promise().query(
      'SELECT * FROM shipping WHERE order_id = ?',
      [orderId]
    );
    
    if (shipping.length === 0) {
      return res.status(404).json({ message: 'Shipping not found' });
    }
    
    const shippingData = shipping[0];
    
    const [history] = await db.promise().query(
      'SELECT * FROM shipping_history WHERE shipping_id = ? ORDER BY created_at DESC',
      [shippingData.id]
    );
    shippingData.history = history;
    
    res.json({ shipping: shippingData });
  } catch (error) {
    console.error('Get shipping error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateShippingStatus = async (req, res) => {
  try {
    const { shippingId } = req.params;
    const { status, location, description } = req.body;
    
    await db.promise().query(
      'UPDATE shipping SET status = ? WHERE id = ?',
      [status, shippingId]
    );
    
    const historyId = uuidv4();
    await db.promise().query(
      'INSERT INTO shipping_history (id, shipping_id, status, location, description) VALUES (?, ?, ?, ?, ?)',
      [historyId, shippingId, status, location, description]
    );
    
    if (status === 'delivered') {
      await db.promise().query(
        'UPDATE shipping SET actual_delivery = CURDATE() WHERE id = ?',
        [shippingId]
      );
    }
    
    res.json({ message: 'Shipping status updated successfully' });
  } catch (error) {
    console.error('Update shipping status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllShipping = async (req, res) => {
  try {
    const [shipping] = await db.promise().query(
      'SELECT * FROM shipping ORDER BY created_at DESC'
    );
    
    for (const item of shipping) {
      const [history] = await db.promise().query(
        'SELECT * FROM shipping_history WHERE shipping_id = ? ORDER BY created_at DESC',
        [item.id]
      );
      item.history = history;
    }
    
    res.json({ shipping });
  } catch (error) {
    console.error('Get all shipping error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.trackByNumber = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    
    const [shipping] = await db.promise().query(
      'SELECT s.*, o.order_number FROM shipping s JOIN orders o ON s.order_id = o.id WHERE s.tracking_number = ?',
      [trackingNumber]
    );
    
    if (shipping.length === 0) {
      return res.status(404).json({ message: 'Tracking number not found' });
    }
    
    const shippingData = shipping[0];
    
    const [history] = await db.promise().query(
      'SELECT * FROM shipping_history WHERE shipping_id = ? ORDER BY created_at DESC',
      [shippingData.id]
    );
    shippingData.history = history;
    
    res.json({ shipping: shippingData });
  } catch (error) {
    console.error('Track by number error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
