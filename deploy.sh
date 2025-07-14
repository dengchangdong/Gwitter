#!/bin/bash

# 删除现有的锁文件
rm -f pnpm-lock.yaml

# 使用 --no-frozen-lockfile 安装依赖
pnpm install --no-frozen-lockfile

# 构建项目
npm run build

# 部署到 Cloudflare Workers
npx wrangler publish 