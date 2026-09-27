# ============================================
# English 项目 - 部署指南
# ============================================

## 📋 目录

1. [服务器要求](#服务器要求)
2. [快速部署](#快速部署)
3. [详细配置](#详细配置)
4. [维护命令](#维护命令)
5. [故障排查](#故障排查)

---

## 服务器要求

| 项目 | 最低配置 | 推荐配置 |
|------|----------|----------|
| CPU | 1 核 | 2 核 |
| 内存 | 1 GB | 2 GB |
| 带宽 | 1 Mbps | 5 Mbps |
| 系统 | Ubuntu 20.04+ / Debian 11+ |  |
| Docker | 20.10+ |  |
| Docker Compose | 2.0+ |  |

---

## 快速部署

### 第一步: 服务器初始化

SSH 登录服务器，以 root 权限运行:

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 创建工作目录并克隆项目
mkdir -p /home/deploy
cd /home/deploy
git clone https://github.com/Noyeyenotea/EnglishLearning.git
cd EnglishLearning
```

### 第二步: 配置环境变量

```bash
cp deploy/.env.production.template deploy/.env.production
vim deploy/.env.production  # 编辑配置
```

**必须修改的配置项:**
- `DATABASE_URL` - 阿里云 RDS PostgreSQL 连接地址
- `AI_DATABASE_URL` - AI 历史记录数据库连接地址
- `SECRET_KEY` - 应用密钥 (至少32位随机字符串)
- `ALIPAY_*` - 支付宝配置 (如需支付功能)
- `DEEPSEEK_API_KEY` - DeepSeek API Key

### 第三步: 部署

```bash
cd /home/deploy/EnglishLearning
./deploy/scripts/deploy.sh
```

---

## 详细配置

### 阿里云 RDS PostgreSQL

详见 [docs/aliyun-rds-guide.md](docs/aliyun-rds-guide.md)

### MinIO 对象存储配置

项目使用 MinIO 存储用户头像和课程图片，配置如下:

```yaml
# MinIO 存储桶会在首次部署时自动创建
# 存储桶列表:
#   - avatar: 用户头像
#   - course: 课程封面图片
#   - public: 公开资源
```

**访问地址:**
- API 地址: `http://47.103.125.49:9000`
- Console 管理界面: `http://47.103.125.49:9001`
- 默认账号: `minioadmin`
- 默认密码: `ChangeMe123!` (可在 .env.production 中修改)

**创建存储桶 (手动方式):**
```bash
docker exec -it english-minio sh
mc alias set local http://localhost:9000 minioadmin ChangeMe123!
mc mb local/avatar
mc mb local/course
mc anonymous set download local/avatar
mc anonymous set download local/course
```

### HTTPS 配置 (可选)

1. 购买域名并配置 DNS 解析到服务器 IP
2. 安装 Certbot:
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com
   ```
3. Certbot 会自动配置 HTTPS 并设置自动续期

### 前端环境变量

修改 `apps/web/.env.production`:
```bash
VITE_MINIO_ENDPOINT='https://你的MinIO地址'
VITE_SOCKET_URL='https://你的域名或IP'
```

---

## 维护命令

### 查看服务状态
```bash
docker compose -f deploy/docker-compose.yml ps
```

### 查看日志
```bash
# 实时日志
docker compose -f deploy/docker-compose.yml logs -f

# 查看特定服务
docker compose -f deploy/docker-compose.yml logs -f server
docker compose -f deploy/docker-compose.yml logs -f web

# 最近 100 行
docker compose -f deploy/docker-compose.yml logs --tail=100
```

### 重启服务
```bash
# 重启所有
docker compose -f deploy/docker-compose.yml restart

# 重启特定服务
docker compose -f deploy/docker-compose.yml restart server
```

### 更新部署
```bash
cd /path/to/english
git pull origin main
./deploy/scripts/deploy.sh
```

### 数据库迁移
```bash
# 进入 server 容器
docker exec -it english-server sh

# 运行 Prisma 迁移
npx prisma migrate deploy

# 或者重新生成 Prisma Client
npx prisma generate
```

---

## 故障排查

### 服务无法启动

1. 检查环境变量:
   ```bash
   docker compose -f deploy/docker-compose.yml config
   ```

2. 检查日志:
   ```bash
   docker compose -f deploy/docker-compose.yml logs server
   ```

3. 常见问题:
   - 端口被占用: `netstat -tlnp | grep 80`
   - 数据库连接失败: 检查 `DATABASE_URL` 是否正确
   - 权限问题: `chmod +x deploy/scripts/*.sh`

### 前端 502 错误

- 检查 server 服务是否正常运行
- 检查 Nginx 日志: `docker compose logs web`

### 数据库连接失败

1. 确认 RDS 白名单已添加服务器 IP
2. 确认 `DATABASE_URL` 格式正确
3. 测试连接: `docker exec -it english-server sh` 然后 `nc -zv <rds-host> 5432`

---

## 架构说明

```
                         ┌─────────────────┐
                         │   用户浏览器    │
                         └────────┬────────┘
                                  │ HTTP/HTTPS (80/443)
                                  ▼
┌──────────────────────────────────────────────────────┐
│                      Nginx                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  静态资源  │  │ API 代理  │  │  WebSocket 代理   │  │
│  │  /       │  │  /api/   │  │   /socket.io/    │  │
│  └──────────┘  └────┬─────┘  └─────────┬─────────┘  │
└─────────────────────┼───────────────────┼────────────┘
                       │                   │
                       ▼                   ▼
┌──────────────────────────────────────────────────────┐
│              Docker Compose (Bridge Network)          │
│                                                       │
│  ┌────────────────┐         ┌────────────────┐       │
│  │   Web (Nginx)  │         │  Server (NestJS) │      │
│  │    Port: 80    │         │    Port: 3000    │      │
│  └────────────────┘         └────────┬────────┘       │
│                                       │                │
│                                       ▼                │
│  ┌────────────────┐  ┌────────────────┐  ┌────────┐ │
│  │    Redis       │  │    PostgreSQL   │  │ MinIO  │ │
│  │   Port: 6379   │  │   Port: 5432    │  │:9000   │ │
│  └────────────────┘  └────────────────┘  └────────┘ │
└──────────────────────────────────────────────────────┘

MinIO 存储:
  - 用户头像: avatar 存储桶
  - 课程图片: course 存储桶
  - 持久化: minio_data 数据卷
```

---

## 文件说明

```
deploy/
├── docker-compose.yml       # Docker Compose 配置
├── Dockerfile.server       # NestJS 服务端 Dockerfile
├── Dockerfile.web          # 前端 Nginx Dockerfile
├── nginx.conf              # Nginx 反向代理配置
├── init-db.sql             # 数据库初始化脚本
├── .env.production.template # 环境变量模板
├── scripts/
│   ├── init-server.sh      # 服务器初始化脚本
│   └── deploy.sh           # 部署脚本
└── docs/
    └── aliyun-rds-guide.md # 阿里云 RDS 配置指南
```
