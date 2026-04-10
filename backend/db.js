const fs = require('fs');
const path = require('path');

// 存储文件路径
const USERS_FILE = path.join(__dirname, 'users.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');

// 确保存储文件存在
function ensureFilesExist() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
  }
}

// 初始化
ensureFilesExist();

// 读取用户数据
function getUsers() {
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

// 保存用户数据
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// 读取订单数据
function getOrders() {
  const data = fs.readFileSync(ORDERS_FILE, 'utf8');
  return JSON.parse(data);
}

// 保存订单数据
function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// 获取用户通过邮箱
function getUserByEmail(email) {
  const users = getUsers();
  return users.find(user => user.email === email);
}

// 获取用户通过ID
function getUserById(id) {
  const users = getUsers();
  return users.find(user => user.id === id);
}

// 添加用户
function addUser(user) {
  const users = getUsers();
  user.id = Date.now(); // 使用时间戳作为ID
  users.push(user);
  saveUsers(users);
  return user;
}

// 添加订单
function addOrder(order) {
  const orders = getOrders();
  order.id = Date.now(); // 使用时间戳作为ID
  orders.push(order);
  saveOrders(orders);
  return order;
}

// 获取用户订单
function getOrdersByUserId(userId) {
  const orders = getOrders();
  return orders.filter(order => order.user_id === userId);
}

module.exports = {
  getUsers,
  saveUsers,
  getOrders,
  saveOrders,
  getUserByEmail,
  getUserById,
  addUser,
  addOrder,
  getOrdersByUserId
};