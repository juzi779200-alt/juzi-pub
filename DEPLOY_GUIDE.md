# 🌐 网站完整部署指南

## 📋 准备工作

确保您已经有：
- ✅ 服务器：138.197.66.29
- ✅ 两个压缩文件：frontend-deploy.zip 和 backend-deploy.zip
- ✅ SSH 访问权限

---

## 🚀 完整部署步骤

### 第一步：登录到您的服务器

在您的本地电脑打开终端，执行：

```bash
ssh root@138.197.66.29
```

输入密码后登录成功。

---

### 第二步：安装必要的软件

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 和 npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 MySQL
sudo apt install -y mysql-server

# 安装 Nginx（Web 服务器）
sudo apt install -y nginx

# 安装 PM2（保持后端运行）
npm install -g pm2

# 安装 unzip（解压文件）
sudo apt install -y unzip
```

验证安装：
```bash
node -v
npm -v
nginx -v
```

---

### 第三步：配置 MySQL 数据库

```bash
# 安全配置 MySQL
sudo mysql_secure_installation
```

按照提示：
- 设置 root 密码（记住这个密码！）
- 移除匿名用户：Yes
- 禁止 root 远程登录：Yes
- 移除测试数据库：Yes
- 重新加载权限表：Yes

```bash
# 登录 MySQL
sudo mysql -u root -p
```

输入 root 密码后，执行以下 SQL：

```sql
CREATE DATABASE luckboxdiy;
CREATE USER 'luckboxdiy'@'localhost' IDENTIFIED BY 'JUZI091900';
GRANT ALL PRIVILEGES ON luckboxdiy.* TO 'luckboxdiy'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

### 第四步：上传文件到服务器

**在您的本地电脑（新终端窗口）执行：**

```bash
# 进入项目目录
cd /Users/chengbaiwan/Desktop/juzi-pub

# 上传前端和后端文件
scp frontend-deploy.zip root@138.197.66.29:/root/
scp backend-deploy.zip root@138.197.66.29:/root/
```

---

### 第五步：部署后端

**回到服务器终端：**

```bash
# 解压后端文件
cd /root
unzip backend-deploy.zip
cd backend

# 安装依赖
npm install

# 导入数据库结构
mysql -u luckboxdiy -p luckboxdiy < database/schema.sql
# 输入密码：JUZI091900

# 启动后端服务（使用 PM2）
pm2 start server.js --name luckboxdiy-api
pm2 save
pm2 startup

# 查看状态
pm2 status
```

---

### 第六步：部署前端

```bash
# 回到 root 目录
cd /root

# 解压前端文件
unzip frontend-deploy.zip

# 备份默认的 Nginx 页面
sudo mv /var/www/html /var/www/html.bak

# 将前端文件移动到 Nginx 目录
sudo mv dist /var/www/html

# 设置正确的权限
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

---

### 第七步：配置 Nginx

```bash
# 创建 Nginx 配置文件
sudo nano /etc/nginx/sites-available/luckboxdiy
```

复制粘贴以下内容：

```nginx
server {
    listen 80;
    server_name 138.197.66.29;

    # 前端静态文件
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 反向代理
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

按 `Ctrl+O` 保存，然后按 `Ctrl+X` 退出。

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/luckboxdiy /etc/nginx/sites-enabled/

# 删除默认站点
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

---

### 第八步：配置防火墙

```bash
# 允许 HTTP、HTTPS 和 SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3001/tcp

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status
```

---

## ✅ 验证部署

### 1. 测试后端
在浏览器访问：
```
http://138.197.66.29/api/
```

应该看到：
```json
{"message":"Welcome to luckboxdiy API"}
```

### 2. 测试前端
在浏览器访问：
```
http://138.197.66.29/
```

应该看到您的网站首页！

---

## 📱 让您的好友访问

现在您可以把这个链接分享给您的好友：

```
http://138.197.66.29/
```

他们就可以访问您的网站了！

---

## 🔧 常用管理命令

### 查看后端状态
```bash
pm2 status
pm2 logs luckboxdiy-api
```

### 重启后端
```bash
pm2 restart luckboxdiy-api
```

### 重启 Nginx
```bash
sudo systemctl restart nginx
```

### 查看 Nginx 日志
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🎉 完成！

恭喜！您的网站现在已经上线了！您的全国好友都可以通过 `http://138.197.66.29/` 访问您的网站了！

---

## 💡 下一步（可选）

### 配置域名（如果有域名）
将您的域名 DNS 解析到 138.197.66.29

### 配置 HTTPS（SSL 证书）
使用 Let's Encrypt 免费证书：
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 定期备份数据库
```bash
mysqldump -u luckboxdiy -p luckboxdiy > backup.sql
```

---

## 🆘 遇到问题？

### 问题1：网站打不开
检查 Nginx 是否运行：
```bash
sudo systemctl status nginx
```

### 问题2：后端 API 不工作
检查 PM2 状态：
```bash
pm2 status
pm2 logs luckboxdiy-api
```

### 问题3：数据库连接错误
检查 MySQL 是否运行：
```bash
sudo systemctl status mysql
```
