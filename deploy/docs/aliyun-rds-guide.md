# ============================================
# 阿里云 RDS PostgreSQL 配置指南
# ============================================

## 1. 创建 RDS 实例

### 1.1 基本配置
- **地域**: 选择离你的服务器最近的地域
- **数据库类型**: PostgreSQL
- **版本**: PostgreSQL 14 或更高（推荐 15 或 16）
- **系列**: 高可用版（生产环境建议）

### 1.2 规格配置
- **规格**: 入门级 1核1G 足够测试，生产环境建议 2核4G
- **存储空间**: 20GB 起

### 1.3 网络配置
- **网络类型**: 专有网络 (VPC)
- **需要与你的 ECS 服务器在同一 VPC 内**

## 2. 创建数据库和用户

### 2.1 连接 RDS
```bash
# 通过阿里云控制台的 SQL 执行窗口或本地 pgAdmin 连接
# 主机: rm-xxxxx.postgres.rds.aliyuncs.com
# 端口: 5432
```

### 2.2 创建数据库
```sql
-- 创建主数据库
CREATE DATABASE english;

-- 创建 AI 历史记录数据库
CREATE DATABASE langchain;
```

### 2.3 创建用户
```sql
-- 创建应用用户
CREATE USER appuser WITH PASSWORD '你的强密码';

-- 授权
GRANT ALL PRIVILEGES ON DATABASE english TO appuser;
GRANT ALL PRIVILEGES ON DATABASE langchain TO appuser;

-- 切换到数据库授权 schema
\c english
GRANT ALL ON SCHEMA public TO appuser;

\c langchain
GRANT ALL ON SCHEMA public TO appuser;
```

## 3. 配置白名单

在阿里云 RDS 控制台:
1. 进入 **数据安全性** → **白名单设置**
2. 添加你的 ECS 服务器 IP 到白名单
3. 格式: `你的服务器IP/32`

> ⚠️ 注意: 如果使用 VPC 内网连接，确保 ECS 和 RDS 在同一 VPC

## 4. 获取连接信息

配置完成后，记录以下信息用于 `deploy/.env.production`:

```
主机地址: rm-xxxxx.postgres.rds.aliyuncs.com
端口: 5432
数据库: english
用户名: appuser
密码: 你设置的密码
```

## 5. 验证连接

```bash
# 在 ECS 服务器上测试连接
psql -h rm-xxxxx.postgres.rds.aliyuncs.com -p 5432 -U appuser -d english
```
