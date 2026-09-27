#!/bin/bash
# ============================================
# 部署脚本 - 一键部署应用到服务器
# ============================================
# 用法: ./deploy.sh
# ============================================

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

echo "========== English 项目部署脚本 =========="

# 检查必要的文件
if [ ! -f "deploy/docker-compose.yml" ]; then
    echo "错误: deploy/docker-compose.yml 不存在"
    exit 1
fi

if [ ! -f "deploy/.env.production" ]; then
    echo "警告: deploy/.env.production 不存在"
    echo "请先创建环境变量文件: cp deploy/.env.production.template deploy/.env.production"
    exit 1
fi

# 拉取最新代码
echo "[1/4] 拉取最新代码..."
if [ -d ".git" ]; then
    git pull origin main
else
    echo "正在克隆仓库..."
    git clone https://github.com/Noyeyenotea/EnglishLearning.git
    cd EnglishLearning
fi

# 构建并启动容器
echo "[2/4] 构建 Docker 镜像..."
docker compose -f deploy/docker-compose.yml build --no-cache server web

echo "[3/4] 启动服务..."
docker compose -f deploy/docker-compose.yml up -d postgres redis

# 等待数据库就绪
echo "等待数据库启动..."
for i in {1..30}; do
    if docker exec english-postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo "数据库已就绪!"
        break
    fi
    echo "等待数据库... ($i/30)"
    sleep 2
done

# 启动前端和后端
docker compose -f deploy/docker-compose.yml up -d server web

# 启动 MinIO
echo "启动 MinIO 存储服务..."
docker compose -f deploy/docker-compose.yml up -d minio

# 等待 MinIO 就绪并初始化
echo "等待 MinIO 启动..."
for i in {1..30}; do
    if docker exec english-minio mc ready local > /dev/null 2>&1; then
        echo "MinIO 已就绪!"
        break
    fi
    echo "等待 MinIO... ($i/30)"
    sleep 2
done

# 初始化 MinIO 存储桶
docker compose -f deploy/docker-compose.yml up minio-init

# 等待服务启动
echo "[4/4] 检查服务状态..."
sleep 10

# 显示容器状态
docker compose -f deploy/docker-compose.yml ps

# 显示日志（最后 20 行）
echo ""
echo "========== 最近日志 =========="
docker compose -f deploy/docker-compose.yml logs --tail=20

echo ""
echo "========== 部署完成 =========="
echo "访问地址:"
echo "  前端:      http://47.103.125.49"
echo "  后端 API:  http://47.103.125.49:3000"
echo "  MinIO:    http://47.103.125.49:9000"
echo "  MinIO Console: http://47.103.125.49:9001"
echo ""
echo "MinIO 默认账号: minioadmin / ChangeMe123!"
echo ""
echo "常用命令:"
echo "  查看日志: docker compose -f deploy/docker-compose.yml logs -f"
echo "  重启服务: docker compose -f deploy/docker-compose.yml restart"
echo "  停止服务: docker compose -f deploy/docker-compose.yml down"
