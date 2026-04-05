#!/bin/bash

# 创建数据库
echo "Creating database..."
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS luckboxdiy;
CREATE USER IF NOT EXISTS 'luckboxdiy'@'localhost' IDENTIFIED BY 'JUZI091900';
GRANT ALL PRIVILEGES ON luckboxdiy.* TO 'luckboxdiy'@'localhost';
FLUSH PRIVILEGES;
EOF

# 导入表结构
echo "Importing schema..."
mysql -u luckboxdiy -pJUZI091900 luckboxdiy < database/schema.sql

echo "Database setup complete!"
