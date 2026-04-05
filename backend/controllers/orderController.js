const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

exports.createOrder = async (req, res) => {
  try {
    const { 
      userId, 
      items, 
      totalAmount, 
      paymentMethod,
      shippingInfo 
    } = req.body;
    
    const orderId = uuidv4();
    const orderNumber = 'LBD' + Date.now();
    
    await db.promise().query(
      'INSERT INTO orders (id, user_id, order_number, total_amount, payment_method, shipping_name, shipping_email, shipping_phone, shipping_address, shipping_city, shipping_country, shipping_zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        orderId, 
        userId || null, 
        orderNumber, 
        totalAmount, 
        paymentMethod,
        shippingInfo.name,
        shippingInfo.email,
        shippingInfo.phone,
        shippingInfo.address,
        shippingInfo.city,
        shippingInfo.country,
        shippingInfo.zipCode
      ]
    );
    
    for (const item of items) {
      const itemId = uuidv4();
      await db.promise().query(
        'INSERT INTO order_items (id, order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
        [itemId, orderId, item.id, item.name, item.quantity, item.price]
      );
    }
    
    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: orderId,
        orderNumber,
        totalAmount,
        status: 'pending',
        paymentMethod
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error during order creation' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const [orders] = await db.promise().query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );
    
    for (const order of orders) {
      const [items] = await db.promise().query(
        'SELECT * FROM order_items WHERE order_id = ?',
        [order.id]
      );
      order.items = items;
    }
    
    res.json({ orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const [orders] = await db.promise().query(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const order = orders[0];
    
    const [items] = await db.promise().query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [orderId]
    );
    order.items = items;
    
    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    await db.promise().query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId]
    );
    
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.promise().query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    
    for (const order of orders) {
      const [items] = await db.promise().query(
        'SELECT * FROM order_items WHERE order_id = ?',
        [order.id]
      );
      order.items = items;
    }
    
    res.json({ orders });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
