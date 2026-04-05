# luckboxdiy 部署指南

## 📦 部署包内容

```
luckboxdiy-deploy/
├── frontend/          # 前端静态文件（已构建）
├── backend/           # 后端 API 代码
├── database/          # 数据库初始化脚本
├── nginx.conf         # Nginx 配置文件
├── ecosystem.config.js # PM2 配置文件
└── deploy.sh          # 一键部署脚本
```

## 🚀 快速部署步骤

### 第一步：上传文件到服务器

在您的本地终端执行：

```bash
# 上传整个部署包到服务器
scp -r /Users/chengbaiwan/Desktop/juzi-pub/luckboxdiy-deploy.tar.gz root@您的服务器IP:/root/
```

### 第二步：在服务器上解压

SSH 登录到您的服务器：

```bash
ssh root@您的服务器IP
```

然后执行：

```bash
cd /root
tar -xzf luckboxdiy-deploy.tar.gz
cd luckboxdiy-deploy
```

### 第三步：安装依赖

```bash
# 安装 Node.js（如果还没有）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2（进程管理器）
sudo npm install -g pm2

# 安装 Nginx（如果还没有）
sudo apt-get install -y nginx

# 安装 MySQL（如果还没有）
sudo apt-get install -y mysql-server
```

### 第四步：配置数据库

```bash
# 登录 MySQL
sudo mysql

# 创建数据库和用户
CREATE DATABASE luckboxdiy;
CREATE USER 'luckboxdiy'@'localhost' IDENTIFIED BY '您的密码';
GRANT ALL PRIVILEGES ON luckboxdiy.* TO 'luckboxdiy'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 导入数据库结构
mysql -u luckboxdiy -p luckboxdiy < database/schema.sql
```

### 第五步：配置后端

```bash
cd /root/luckboxdiy-deploy/backend

# 安装依赖
npm install --production

# 编辑环境变量
nano .env
```

修改 `.env` 文件内容：

```env
PORT=3001
DB_HOST=localhost
DB_USER=luckboxdiy
DB_PASSWORD=您的数据库密码
DB_NAME=luckboxdiy
JWT_SECRET=随机生成的密钥（可以用 openssl rand -base64 32 生成）
JWT_EXPIRE=7d

# PayPal 配置
PAYPAL_CLIENT_ID=ARpiWA7dAEeKJeFzEI8hO6VT4x-hMEB_-g5vrvaOE62aSkmWFbNv7U9kJhPRsD0A4mtHgjsEF3Ek-1Az
PAYPAL_SECRET=EKqos9wyWpNy0B-HwXAewLON1tQsMo6UoQopjrXKquqvs5hF2Kx7NAX_mEMeH0OdzIR_56wWkfqkDakd
NODE_ENV=production
```

### 第六步：启动后端服务

```bash
cd /root/luckboxdiy-deploy/backend

# 使用 PM2 启动
pm2 start ecosystem.config.js

# 设置开机自启
pm2 startup
pm2 save
```

### 第七步：配置 Nginx

```bash
# 复制前端文件到 Nginx 目录
sudo cp -r /root/luckboxdiy-deploy/frontend/* /var/www/html/

# 复制 Nginx 配置
sudo cp /root/luckboxdiy-deploy/nginx.conf /etc/nginx/sites-available/luckboxdiy

# 启用配置
sudo ln -s /etc/nginx/sites-available/luckboxdiy /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 第八步：配置防火墙

```bash
# 允许 HTTP 和 HTTPS
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable
```

### 第九步：配置 SSL（HTTPS）

```bash
# 安装 Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# 获取 SSL 证书（替换为您的域名）
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 自动续期
sudo systemctl enable certbot.timer
```

## ✅ 验证部署

访问您的网站：

- HTTP: http://您的服务器IP 或 http://yourdomain.com
- HTTPS: https://yourdomain.com

检查后端 API：

```bash
curl http://localhost:3001/health
```

## 🔧 常用命令

### PM2 命令

```bash
pm2 status              # 查看服务状态
pm2 logs luckboxdiy     # 查看日志
pm2 restart luckboxdiy  # 重启服务
pm2 stop luckboxdiy     # 停止服务
```

### Nginx 命令

```bash
sudo systemctl status nginx   # 查看状态
sudo systemctl restart nginx  # 重启
sudo nginx -t                 # 测试配置
```

### 更新网站

```bash
# 1. 在本地重新打包
npm run build
tar -czf luckboxdiy-deploy.tar.gz luckboxdiy-deploy/

# 2. 上传到服务器
scp luckboxdiy-deploy.tar.gz root@您的服务器IP:/root/

# 3. 在服务器上解压并更新
ssh root@您的服务器IP
cd /root
tar -xzf luckboxdiy-deploy.tar.gz
sudo cp -r luckboxdiy-deploy/frontend/* /var/www/html/
pm2 restart luckboxdiy
```

## 🆘 故障排除

### 后端无法启动

```bash
# 检查日志
pm2 logs luckboxdiy

# 检查端口占用
sudo lsof -i :3001

# 检查数据库连接
mysql -u luckboxdiy -p -h localhost luckboxdiy
```

### 前端无法访问

```bash
# 检查 Nginx 状态
sudo systemctl status nginx

# 检查 Nginx 错误日志
sudo tail -f /var/log/nginx/error.log

# 检查文件权限
ls -la /var/www/html/
```

### 数据库连接失败

```bash
# 检查 MySQL 状态
sudo systemctl status mysql

# 检查用户权限
sudo mysql -e "SHOW GRANTS FOR 'luckboxdiy'@'localhost';"
```

## 📞 需要帮助？

如果遇到问题，请提供：
1. 错误信息截图
2. PM2 日志：`pm2 logs luckboxdiy --lines 50`
3. Nginx 日志：`sudo tail -50 /var/log/nginx/error.log`
