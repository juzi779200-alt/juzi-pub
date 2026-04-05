# LuckboxDIY 后端项目

## 项目概述
完整的电商网站后端系统，包含用户认证、订单管理和物流跟踪功能。

## 技术栈
- Node.js + Express
- MySQL 数据库
- JWT 认证
- bcrypt 密码加密

## 已完成的功能

### 1. 数据库设计
- users 表：用户信息
- orders 表：订单信息
- order_items 表：订单商品
- shipping 表：物流信息
- shipping_history 表：物流历史记录

### 2. 用户认证 API
- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录
- GET /api/auth/profile - 获取用户信息
- PUT /api/auth/profile - 更新用户信息

### 3. 订单管理 API
- POST /api/orders - 创建订单
- GET /api/orders/user - 获取用户订单
- GET /api/orders/:orderId - 获取订单详情
- PUT /api/orders/:orderId/status - 更新订单状态
- GET /api/orders/all - 获取所有订单（管理员）

### 4. 物流跟踪 API
- POST /api/shipping - 创建物流信息
- GET /api/shipping/order/:orderId - 获取订单物流信息
- PUT /api/shipping/:shippingId/status - 更新物流状态
- GET /api/shipping/all - 获取所有物流信息（管理员）
- GET /api/shipping/track/:trackingNumber - 通过跟踪号查询物流

## 安装步骤

### 1. 安装依赖
```bash
cd backend
npm install
```

### 2. 配置数据库
```bash
mysql -u root -p
```

在 MySQL 中执行：
```sql
CREATE DATABASE luckboxdiy;
USE luckboxdiy;
source database/schema.sql;
```

### 3. 配置环境变量
编辑 `.env` 文件：
```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=luckboxdiy
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

### 4. 启动服务器
```bash
npm start
```

开发模式：
```bash
npm run dev
```

## API 端点

### 认证端点
- POST http://localhost:3001/api/auth/register
- POST http://localhost:3001/api/auth/login
- GET http://localhost:3001/api/auth/profile (需要认证)
- PUT http://localhost:3001/api/auth/profile (需要认证)

### 订单端点
- POST http://localhost:3001/api/orders (需要认证)
- GET http://localhost:3001/api/orders/user (需要认证)
- GET http://localhost:3001/api/orders/:orderId (需要认证)
- PUT http://localhost:3001/api/orders/:orderId/status (需要认证)

### 物流端点
- POST http://localhost:3001/api/shipping (需要认证)
- GET http://localhost:3001/api/shipping/order/:orderId (需要认证)
- PUT http://localhost:3001/api/shipping/:shippingId/status (需要认证)
- GET http://localhost:3001/api/shipping/track/:trackingNumber (公开)

## 前端集成

前端页面已创建：
- Register.tsx - 用户注册页面
- Login.tsx - 用户登录页面
- Dashboard.tsx - 用户仪表板
- Orders.tsx - 订单管理页面
- TrackOrder.tsx - 物流跟踪页面

## 部署到服务器

### 1. 安装 MySQL
```bash
sudo apt update
sudo apt install mysql-server -y
```

### 2. 配置 MySQL
```bash
sudo mysql_secure_installation
```

### 3. 创建数据库和用户
```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE luckboxdiy;
CREATE USER 'luckboxdiy'@'localhost' IDENTIFIED BY 'JUZI091900';
GRANT ALL PRIVILEGES ON luckboxdiy.* TO 'luckboxdiy'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. 导入数据库结构
```bash
mysql -u luckboxdiy -p luckboxdiy < database/schema.sql
```

### 5. 上传后端代码
```bash
scp -r backend/* root@138.197.66.29:/root/luckboxdiy-backend/
```

### 6. 安装依赖
```bash
ssh root@138.197.66.29
cd /root/luckboxdiy-backend
npm install
```

### 7. 配置 Nginx 反向代理
```bash
sudo nano /etc/nginx/sites-available/luckboxdiy.com
```

添加以下配置：
```nginx
server {
    listen 80;
    server_name luckboxdiy.com www.luckboxdiy.com;

    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ =404;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

重启 Nginx：
```bash
sudo systemctl restart nginx
```

### 8. 使用 PM2 运行后端服务
```bash
npm install -g pm2
pm2 start server.js --name luckboxdiy-api
pm2 save
pm2 startup
```

## 注意事项
1. 生产环境请修改 JWT_SECRET
2. 确保 MySQL 密码安全
3. 配置 HTTPS 证书
4. 定期备份数据库
5. 监控服务器性能

## 下一步
1. 部署到 DigitalOcean 服务器
2. 配置 SSL 证书
3. 测试所有功能
4. 添加支付集成
5. 添加邮件通知功能
