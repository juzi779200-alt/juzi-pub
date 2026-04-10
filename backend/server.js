const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'your-secret-key'; // 实际生产环境中应该使用环境变量

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 生成订单号
function generateOrderNumber() {
  return 'ORD' + Date.now() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

// 注册接口
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // 检查邮箱是否已存在
  const existingUser = db.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // 加密密码
  const hashedPassword = bcrypt.hashSync(password, 10);

  // 插入新用户
  const newUser = db.addUser({
    name,
    email,
    password: hashedPassword,
    created_at: new Date().toISOString()
  });

  // 生成 JWT token
  const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json({
    message: 'Registration successful',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

// 登录接口
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // 查找用户
  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // 验证密码
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // 生成 JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// 获取用户信息接口
app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.getUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// 创建订单接口
app.post('/api/orders', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { items, totalPrice, shippingAddress, paymentMethod } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const orderNumber = generateOrderNumber();

    // 创建订单
    const newOrder = db.addOrder({
      user_id: decoded.id,
      order_number: orderNumber,
      total_price: totalPrice,
      status: 'processing',
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      items: items,
      created_at: new Date().toISOString()
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: newOrder.id,
        orderNumber: newOrder.order_number,
        totalPrice: newOrder.total_price,
        status: newOrder.status,
        shippingAddress: newOrder.shipping_address,
        paymentMethod: newOrder.payment_method,
        createdAt: newOrder.created_at
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// 获取用户订单列表接口
app.get('/api/orders', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const orders = db.getOrdersByUserId(decoded.id);

    // 转换订单格式
    const formattedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.order_number,
      totalPrice: order.total_price,
      status: order.status,
      shippingAddress: order.shipping_address,
      paymentMethod: order.payment_method,
      items: order.items,
      createdAt: order.created_at
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});