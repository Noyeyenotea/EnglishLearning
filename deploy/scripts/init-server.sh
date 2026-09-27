#!/bin/bash
# ============================================
# 服务器初始化脚本
# 用于阿里云服务器首次设置
# ============================================

set -e

echo "========== 服务器初始化脚本 =========="
echo "此脚本需要在阿里云服务器上以 root 权限运行"
echo ""

# 检测是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo "错误: 请使用 root 用户运行此脚本"
    echo "提示: sudo su - 进入 root 模式"
    exit 1
fi

# 更新系统
echo "[1/6] 更新系统包..."
apt update && apt upgrade -y

# 安装基础工具
echo "[2/6] 安装基础工具..."
apt install -y curl wget git vim unzip ca-certificates gnupg lsb-release

# 安装 Docker
echo "[3/6] 安装 Docker..."
if command -v docker &> /dev/null; then
    echo "Docker 已安装，跳过"
else
    # 添加 Docker GPG 密钥
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc
    
    # 添加 Docker 仓库
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # 安装 Docker
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # 启动 Docker
    systemctl start docker
    systemctl enable docker
    
    echo "Docker 安装完成"
fi

# 安装 Docker Compose (独立版本)
echo "[4/6] 检查 Docker Compose..."
if ! command -v docker compose &> /dev/null; then
    echo "安装 Docker Compose 独立版本..."
    curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

# 配置防火墙 (仅开放必要端口)
echo "[5/6] 配置防火墙..."
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS (将来可能用到)
    ufw --force enable
elif command -v firewalld &> /dev/null; then
    firewall-cmd --permanent --add-port=80/tcp
    firewall-cmd --permanent --add-port=443/tcp
    firewall-cmd --reload
fi

# 阿里云安全组需要在控制台手动配置
echo "[6/6] 重要提示..."
echo ""
echo "请在阿里云控制台开放以下端口:"
echo "  - 22 (SSH)"
echo "  - 80 (HTTP)"
echo "  - 443 (HTTPS，可选)"
echo ""
echo "========== 初始化完成 =========="
echo ""
echo "请在阿里云控制台开放以下端口:"
