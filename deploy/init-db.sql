-- ============================================
-- English 项目 - 数据库初始化脚本
-- ============================================
-- 此脚本在 PostgreSQL 容器首次启动时自动执行
-- 用于创建 Prisma 所需的数据表

-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 用户表
-- ============================================
CREATE TABLE IF NOT EXISTS "User" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "username" VARCHAR(100),
    "avatar" VARCHAR(500),
    "role" VARCHAR(50) DEFAULT 'user',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 课程表
-- ============================================
CREATE TABLE IF NOT EXISTS "Course" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "coverImage" VARCHAR(500),
    "price" DECIMAL(10,2) DEFAULT 0,
    "isFree" BOOLEAN DEFAULT false,
    "category" VARCHAR(100),
    "level" VARCHAR(50) DEFAULT 'beginner',
    "sortOrder" INT DEFAULT 0,
    "isPublished" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 章节表
-- ============================================
CREATE TABLE IF NOT EXISTS "Chapter" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "courseId" UUID NOT NULL REFERENCES "Course"("id") ON DELETE CASCADE,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "videoUrl" VARCHAR(500),
    "duration" INT DEFAULT 0,
    "sortOrder" INT DEFAULT 0,
    "isFree" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 学习记录表
-- ============================================
CREATE TABLE IF NOT EXISTS "Learn" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "courseId" UUID NOT NULL REFERENCES "Course"("id") ON DELETE CASCADE,
    "chapterId" UUID REFERENCES "Chapter"("id") ON DELETE SET NULL,
    "progress" DECIMAL(5,2) DEFAULT 0,
    "lastPosition" INT DEFAULT 0,
    "isCompleted" BOOLEAN DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 订单表
-- ============================================
CREATE TABLE IF NOT EXISTS "Order" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "orderNo" VARCHAR(100) UNIQUE NOT NULL,
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "courseId" UUID NOT NULL REFERENCES "Course"("id") ON DELETE CASCADE,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(50) DEFAULT 'pending',
    "payMethod" VARCHAR(50),
    "tradeNo" VARCHAR(100),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 追踪器相关表 (埋点)
-- ============================================
CREATE TABLE IF NOT EXISTS "Visitor" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "visitorId" VARCHAR(255) UNIQUE NOT NULL,
    "ip" VARCHAR(100),
    "userAgent" TEXT,
    "country" VARCHAR(100),
    "city" VARCHAR(100),
    "device" VARCHAR(100),
    "browser" VARCHAR(100),
    "os" VARCHAR(100),
    "firstVisit" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastVisit" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "visitCount" INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "PageView" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "visitorId" UUID REFERENCES "Visitor"("id") ON DELETE SET NULL,
    "sessionId" VARCHAR(255) NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "referrer" VARCHAR(500),
    "title" VARCHAR(255),
    "duration" INT DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PerformanceEntry" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "visitorId" UUID REFERENCES "Visitor"("id") ON DELETE SET NULL,
    "sessionId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "rating" VARCHAR(50),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "TrackEvent" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "visitorId" UUID REFERENCES "Visitor"("id") ON DELETE SET NULL,
    "sessionId" VARCHAR(255) NOT NULL,
    "eventName" VARCHAR(255) NOT NULL,
    "eventData" JSONB,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "ErrorEntry" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "visitorId" UUID REFERENCES "Visitor"("id") ON DELETE SET NULL,
    "sessionId" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "source" VARCHAR(100),
    "lineno" INT,
    "colno" INT,
    "level" VARCHAR(50) DEFAULT 'error',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 创建索引
-- ============================================
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "Course_category_idx" ON "Course"("category");
CREATE INDEX IF NOT EXISTS "Course_isPublished_idx" ON "Course"("isPublished");
CREATE INDEX IF NOT EXISTS "Chapter_courseId_idx" ON "Chapter"("courseId");
CREATE INDEX IF NOT EXISTS "Learn_userId_idx" ON "Learn"("userId");
CREATE INDEX IF NOT EXISTS "Learn_courseId_idx" ON "Learn"("courseId");
CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "Order_orderNo_idx" ON "Order"("orderNo");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status");
CREATE INDEX IF NOT EXISTS "PageView_visitorId_idx" ON "PageView"("visitorId");
CREATE INDEX IF NOT EXISTS "PageView_sessionId_idx" ON "PageView"("sessionId");
CREATE INDEX IF NOT EXISTS "PerformanceEntry_visitorId_idx" ON "PerformanceEntry"("visitorId");
CREATE INDEX IF NOT EXISTS "TrackEvent_visitorId_idx" ON "TrackEvent"("visitorId");
CREATE INDEX IF NOT EXISTS "ErrorEntry_visitorId_idx" ON "ErrorEntry"("visitorId");

-- ============================================
-- 插入示例数据
-- ============================================

-- 创建测试用户
INSERT INTO "User" ("email", "password", "username", "role") VALUES
('admin@example.com', '$2b$10$dummy_hash_for_demo', '管理员', 'admin'),
('test@example.com', '$2b$10$dummy_hash_for_demo', '测试用户', 'user')
ON CONFLICT (email) DO NOTHING;

-- 创建示例课程
INSERT INTO "Course" ("title", "description", "price", "isFree", "category", "level", "isPublished") VALUES
('零基础英语入门', '从字母和音标开始，系统学习英语基础', 0, true, '入门', 'beginner', true),
('日常英语口语', '学习日常生活中的实用英语表达', 99.00, false, '口语', 'intermediate', true),
('商务英语进阶', '职场商务场景英语听说读写', 199.00, false, '商务', 'advanced', true)
ON CONFLICT DO NOTHING;

-- 为课程添加章节
INSERT INTO "Chapter" ("courseId", "title", "description", "sortOrder", "isFree") 
SELECT c.id, '第一章：课程介绍', '本章节介绍课程内容和学习方法', 1, true
FROM "Course" c WHERE c.title = '零基础英语入门'
ON CONFLICT DO NOTHING;

INSERT INTO "Chapter" ("courseId", "title", "description", "sortOrder", "isFree") 
SELECT c.id, '第二章：字母学习', '学习26个英语字母的发音和书写', 2, true
FROM "Course" c WHERE c.title = '零基础英语入门'
ON CONFLICT DO NOTHING;

-- 创建默认管理员 (密码: admin123)
-- 注意：实际使用时请通过应用注册并修改密码
INSERT INTO "User" ("email", "password", "username", "role") 
VALUES ('admin@example.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZQZQZQZQZQZQZ', '管理员', 'admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 完成提示
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '数据库初始化完成！';
    RAISE NOTICE '默认用户: admin@example.com / admin123';
    RAISE NOTICE '请在应用启动后修改默认密码！';
END $$;
