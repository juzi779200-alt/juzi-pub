#!/bin/bash

# luckboxdiy 自动部署脚本
# 使用方法: chmod +x deploy.sh && ./deploy.sh

set -e

echo "========================================="
echo "  luckboxdiy 自动部署脚本"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}请使用 root 权限运行此脚本${NC}"
    echo "运行: sudo ./deploy.sh"
    exit 1
fi

# 配置变量
DEPLOY_DIR="/var/www/luckboxdiy"
BACKEND_PORT=3001
DOMAIN=""

# 获取域名
read -p "请输入您的域名（如 luckboxdiy.com，没有域名直接回车）: " DOMAIN

echo ""
echo -e "${YELLOW}步骤 1/8: 检查系统环境...${NC}"

# 检查并安装 Node.js
if ! command -v node &> /dev/null; then
    echo "正在安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi
echo -e "${GREEN}✓ Node.js $(node -v) 已安装${NC}"

# 检查并安装 PM2
if ! command -v pm2 &> /dev/null; then
    echo "正在安装 PM2..."
    npm install -g pm2
fi
echo -e "${GREEN}✓ PM2 已安装${NC}"

# 检查并安装 Nginx
if ! command -v nginx &> /dev/null; then
    echo "正在安装 Nginx..."
    apt-get update
    apt-get install -y nginx
fi
echo -e "${GREEN}✓ Nginx 已安装${NC}"

# 检查并安装 MySQL
if ! command -v mysql &> /dev/null; then
    echo "正在安装 MySQL..."
    apt-get install -y mysql-server
    mysql_secure_installation
fi
echo -e "${GREEN}✓ MySQL 已安装${NC}"

echo ""
echo -e "${YELLOW}步骤 2/8: 配置数据库...${NC}"

# 创建数据库
read -sp "请输入 MySQL root 密码: " MYSQL_ROOT_PASSWORD
echo ""

read -sp "请为 luckboxdiy 数据库用户设置密码: " DB_PASSWORD
echo ""

mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOF
CREATE DATABASE IF NOT EXISTS luckboxdiy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'luckboxdiy'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON luckboxdiy.* TO 'luckboxdiy'@'localhost';
FLUSH PRIVILEGES;
EOF

echo -e "${GREEN}✓ 数据库已创建${NC}"

# 导入数据库结构
mysql -u luckboxdiy -p"$DB_PASSWORD" luckboxdiy < database/schema.sql
echo -e "${GREEN}✓ 数据库结构已导入${NC}"

echo ""
echo -e "${YELLOW}步骤 3/8: 部署前端文件...${NC}"

# 创建部署目录
mkdir -p $DEPLOY_DIR
mkdir -p /var/www/html

# 复制前端文件
cp -r frontend/* /var/www/html/
echo -e "${GREEN}✓ 前端文件已部署到 /var/www/html/${NC}"

echo ""
echo -e "${YELLOW}步骤 4/8: 部署后端服务...${NC}"

# 创建后端目录
mkdir -p $DEPLOY_DIR/backend
mkdir -p $DEPLOY_DIR/backend/logs

# 复制后端文件
cp -r backend/* $DEPLOY_DIR/backend/

# 创建环境变量文件
JWT_SECRET=$(openssl rand -base64 32)
cat > $DEPLOY_DIR/backend/.env <<EOF
PORT=$BACKEND_PORT
DB_HOST=localhost
DB_USER=luckboxdiy
DB_PASSWORD=$DB_PASSWORD
DB_NAME=luckboxdiy
JWT_SECRET=$JWT_SECRET
JWT_EXPIRE=7d

# PayPal 配置
PAYPAL_CLIENT_ID=ARpiWA7dAEeKJeFzEI8hO6VT4x-hMEB_-g5vrvaOE62aSkmWFbNv7U9kJhPRsD0A4mtHgjsEF3Ek-1Az
PAYPAL_SECRET=EKqos9wyWpNy0B-HwXAewLON1tQsMo6UoQopjrXKquqvs5hF2Kx7NAX_mEMeH0OdzIR_56wWkfqkDakd
NODE_ENV=production
EOF

# 安装后端依赖
cd $DEPLOY_DIR/backend
npm install --production

echo -e "${GREEN}✓ 后端服务已部署${NC}"

echo ""
echo -e "${YELLOW}步骤 5/8: 启动后端服务...${NC}"

# 使用 PM2 启动服务
pm2 start ecosystem.config.js
pm2 save
pm2 startup | tail -n 1 | bash

echo -e "${GREEN}✓ 后端服务已启动${NC}"

echo ""
echo -e "${YELLOW}步骤 6/8: 配置 Nginx...${NC}"

# 更新 Nginx 配置中的域名
if [ -n "$DOMAIN" ]; then
    sed -i "s/server_name _;/server_name $DOMAIN www.$DOMAIN;/" nginx.conf
fi

# 复制 Nginx 配置
cp nginx.conf /etc/nginx/sites-available/luckboxdiy
ln -sf /etc/nginx/sites-available/luckboxdiy /etc/nginx/sites-enabled/luckboxdiy

# 删除默认配置
rm -f /etc/nginx/sites-enabled/default

# 测试并重启 Nginx
nginx -t
systemctl restart nginx

echo -e "${GREEN}✓ Nginx 已配置${NC}"

echo ""
echo -e "${YELLOW}步骤 7/8: 配置防火墙...${NC}"

ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

echo -e "${GREEN}✓ 防火墙已配置${NC}"

echo ""
echo -e "${YELLOW}步骤 8/8: 配置 SSL 证书...${NC}"

if [ -n "$DOMAIN" ]; then
    # 安装 Certbot
    apt-get install -y certbot python3-certbot-nginx
    
    # 获取 SSL 证书
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    # 设置自动续期
    systemctl enable certbot.timer
    
    echo -e "${GREEN}✓ SSL 证书已配置${NC}"
else
    echo -e "${YELLOW}跳过 SSL 配置（未提供域名）${NC}"
fi

echo ""
echo "========================================="
echo -e "${GREEN}✓ 部署完成！${NC}"
echo "========================================="
echo ""

if [ -n "$DOMAIN" ]; then
    echo "访问地址: https://$DOMAIN"
    echo "管理后台: https://$DOMAIN/admin"
else
    echo "访问地址: http://$(curl -s ifconfig.me)"
fi

echo ""
echo "后端 API: http://localhost:$BACKEND_PORT"
echo "健康检查: http://localhost:$BACKEND_PORT/health"
echo ""
echo "常用命令:"
echo "  查看服务状态: pm2 status"
echo "  查看日志: pm2 logs luckboxdiy"
echo "  重启服务: pm2 restart luckboxdiy"
echo "  重启 Nginx: systemctl restart nginx"
echo ""
echo "数据库信息:"
echo "  数据库: luckboxdiy"
echo "  用户名: luckboxdiy"
echo "  密码: [您设置的密码]"
echo ""
