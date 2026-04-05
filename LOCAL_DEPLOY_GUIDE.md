# luckboxdiy 本地完整部署指南

## 📦 文件位置

所有文件已保存在您的本地电脑：

```
/Users/chengbaiwan/Desktop/juzi-pub/
├── dist/                    # 前端构建文件（已构建完成）
│   ├── index.html
│   ├── assets/
│   └── images/             # 产品图片
├── backend/                 # 后端 API 代码
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── models/
│   ├── package.json
│   └── ecosystem.config.js
├── database/
│   └── schema.sql          # 数据库结构
├── public/images/          # 原始产品图片
├── nginx.conf              # Nginx 配置文件
├── deploy.sh               # 自动部署脚本
├── DEPLOY_INSTRUCTIONS.md  # 详细部署说明
└── luckboxdiy-deploy.tar.gz # 部署包（已打包）
```

## 🚀 部署方法

### 方法一：使用部署包（推荐）

部署包位置：
```
/Users/chengbaiwan/Desktop/juzi-pub/luckboxdiy-deploy.tar.gz
```

上传到服务器：
```bash
scp /Users/chengbaiwan/Desktop/juzi-pub/luckboxdiy-deploy.tar.gz root@138.197.66.29:/root/
```

### 方法二：手动部署

#### 1. 前端部署

前端文件位置：
```
/Users/chengbaiwan/Desktop/juzi-pub/dist/
```

上传到服务器：
```bash
scp -r /Users/chengbaiwan/Desktop/juzi-pub/dist/* root@138.197.66.29:/var/www/html/
```

#### 2. 后端部署

后端文件位置：
```
/Users/chengbaiwan/Desktop/juzi-pub/backend/
```

上传到服务器：
```bash
scp -r /Users/chengbaiwan/Desktop/juzi-pub/backend root@138.197.66.29:/var/www/luckboxdiy/
```

#### 3. 数据库部署

数据库文件位置：
```
/Users/chengbaiwan/Desktop/juzi-pub/database/schema.sql
```

上传到服务器并导入：
```bash
scp /Users/chengbaiwan/Desktop/juzi-pub/database/schema.sql root@138.197.66.29:/root/
ssh root@138.197.66.29 "mysql -u root -p luckboxdiy < /root/schema.sql"
```

## 📋 完整部署步骤

### 第一步：准备服务器

SSH 登录服务器：
```bash
ssh root@138.197.66.29
```

安装必要软件：
```bash
# 更新系统
apt-get update

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 安装 PM2
npm install -g pm2

# 安装 Nginx
apt-get install -y nginx

# 安装 MySQL
apt-get install -y mysql-server
```

### 第二步：配置数据库

```bash
# 登录 MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE luckboxdiy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建用户
CREATE USER 'luckboxdiy'@'localhost' IDENTIFIED BY '您的密码';
GRANT ALL PRIVILEGES ON luckboxdiy.* TO 'luckboxdiy'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 第三步：部署前端

在本地终端执行：
```bash
scp -r /Users/chengbaiwan/Desktop/juzi-pub/dist/* root@138.197.66.29:/var/www/html/
scp -r /Users/chengbaiwan/Desktop/juzi-pub/public/images root@138.197.66.29:/var/www/html/
```

### 第四步：部署后端

在本地终端执行：
```bash
scp -r /Users/chengbaiwan/Desktop/juzi-pub/backend/* root@138.197.66.29:/var/www/luckboxdiy/
```

在服务器上执行：
```bash
cd /var/www/luckboxdiy
npm install --production

# 创建环境变量文件
cat > .env << 'EOF'
PORT=3001
DB_HOST=localhost
DB_USER=luckboxdiy
DB_PASSWORD=您的数据库密码
DB_NAME=luckboxdiy
JWT_SECRET=随机生成的密钥
JWT_EXPIRE=7d
PAYPAL_CLIENT_ID=ARpiWA7dAEeKJeFzEI8hO6VT4x-hMEB_-g5vrvaOE62aSkmWFbNv7U9kJhPRsD0A4mtHgjsEF3Ek-1Az
PAYPAL_SECRET=EKqos9wyWpNy0B-HwXAewLON1tQsMo6UoQopjrXKquqvs5hF2Kx7NAX_mEMeH0OdzIR_56wWkfqkDakd
NODE_ENV=production
EOF

# 启动服务
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 第五步：配置 Nginx

在本地终端执行：
```bash
scp /Users/chengbaiwan/Desktop/juzi-pub/nginx.conf root@138.197.66.29:/etc/nginx/sites-available/luckboxdiy
```

在服务器上执行：
```bash
ln -s /etc/nginx/sites-available/luckboxdiy /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### 第六步：配置 SSL（HTTPS）

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d luckboxdiy.com -d www.luckboxdiy.com
```

## 🔧 故障排除

### 数据库外键错误

如果导入数据库时出现外键错误，使用简化版数据库结构：

```sql
-- 用户表
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 产品表
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image VARCHAR(500),
    category VARCHAR(100),
    stock INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE
);

-- 订单表
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 服务启动失败

检查日志：
```bash
pm2 logs
systemctl status nginx
mysql -u root -p -e "SHOW DATABASES;"
```

## 📞 联系方式

如果遇到问题，请提供：
1. 错误信息截图
2. PM2 日志：`pm2 logs --lines 50`
3. Nginx 错误日志：`tail -50 /var/log/nginx/error.log`

## ✅ 部署完成检查清单

- [ ] 前端可以访问：http://138.197.66.29 或 https://luckboxdiy.com
- [ ] 后端 API 正常：http://138.197.66.29:3001/health
- [ ] 数据库连接正常
- [ ] PayPal 支付可以正常使用
- [ ] 所有产品图片显示正常

---

**所有文件已保存在：/Users/chengbaiwan/Desktop/juzi-pub/**
