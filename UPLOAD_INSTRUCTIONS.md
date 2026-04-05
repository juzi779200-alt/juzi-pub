# 上传部署指南

## 📦 部署包位置

**文件路径：**
```
/Users/chengbaiwan/Desktop/juzi-pub/luckboxdiy-deploy.tar.gz
```

**文件大小：** 约12MB

## 🚀 上传到服务器

### 方法：使用 SCP 命令（推荐）

在您的终端中执行以下命令：

```bash
# 上传部署包到服务器
scp /Users/chengbaiwan/Desktop/juzi-pub/luckboxdiy-deploy.tar.gz root@138.197.66.29:/root/
```

执行后会提示输入服务器密码，输入您的root密码即可。

## 🔧 服务器部署步骤

上传完成后，SSH登录服务器：

```bash
# 登录服务器
ssh root@138.197.66.29
```

然后执行以下命令：

```bash
# 解压部署包
cd /root
tar -xzf luckboxdiy-deploy.tar.gz

# 进入部署目录
cd luckboxdiy-deploy

# 运行自动部署脚本
chmod +x deploy.sh
./deploy.sh
```

## 📋 部署脚本会自动完成：

1. **检查系统环境**：Node.js、PM2、Nginx、MySQL
2. **配置数据库**：创建数据库和用户
3. **部署前端**：复制到 Nginx 目录
4. **部署后端**：安装依赖并启动服务
5. **配置 Nginx**：设置虚拟主机
6. **配置 SSL**：自动获取 HTTPS 证书
7. **启动服务**：确保所有服务运行

## 🎯 部署完成后

**访问您的网站：**
- 有域名：`https://luckboxdiy.com`
- 无域名：`http://138.197.66.29`

**检查服务状态：**
```bash
pm2 status              # 查看后端服务
systemctl status nginx  # 查看 Nginx
systemctl status mysql  # 查看数据库
```

## ❓ 遇到问题？

如果部署过程中遇到问题，请提供：
1. 具体的错误信息
2. 服务器系统信息
3. 尝试的操作步骤

---

**现在您可以在终端中执行上传命令了！** 🚀