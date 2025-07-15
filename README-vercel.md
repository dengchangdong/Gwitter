# 在Vercel上部署Gwitter

这份文档提供了在Vercel上部署Gwitter的详细步骤和配置指南。

## 前置准备

1. 拥有一个GitHub账号
2. 创建GitHub OAuth应用（详见主README中的设置说明）
3. 生成GitHub个人访问令牌
4. 拥有一个Vercel账号

## 部署步骤

### 1. Fork 或克隆 Gwitter 仓库

首先，访问[Gwitter仓库](https://github.com/SimonAKing/Gwitter)并Fork到您自己的GitHub账户下，或者克隆后推送到您自己的仓库。

### 2. 在Vercel导入您的仓库

1. 登录[Vercel](https://vercel.com)
2. 点击"New Project"（新项目）
3. 从GitHub导入您的Gwitter仓库
4. 在导入配置页面，设置以下构建选项：
   - **Framework Preset**：Other
   - **Build Command**：`npm run build`
   - **Output Directory**：`dist`

### 3. 配置环境变量

在Vercel的项目设置中，添加以下环境变量：

```
# GitHub OAuth应用配置
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# GitHub个人访问令牌（为了安全分为两部分）
GITHUB_TOKEN_PART1=your_token_part1
GITHUB_TOKEN_PART2=your_token_part2

# GitHub仓库配置
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name

# 应用配置
PAGE_SIZE=6
ONLY_SHOW_OWNER=false
ENABLE_ABOUT=false
```

### 4. 更新GitHub OAuth应用设置

在GitHub中，更新您的OAuth应用设置：

1. 访问[GitHub开发者设置](https://github.com/settings/developers)
2. 选择您的OAuth应用
3. 将"Authorization callback URL"设置为您的Vercel部署URL
   - 例如：`https://your-gwitter-app.vercel.app`

### 5. 部署应用

点击"Deploy"按钮部署您的应用。

## 常见问题和解决方案

### 跨域问题(CORS)

如果遇到跨域问题，可以：
1. 设置自己的CORS代理服务
2. 使用Vercel Serverless Functions作为代理

### OAuth重定向问题

确保GitHub OAuth应用的回调URL与Vercel部署的URL完全匹配。

### 无法获取Issues

1. 检查GitHub令牌是否有效
2. 确保仓库名称和用户名配置正确
3. 确认仓库中存在公开的Issues

## 功能说明

此版本的Gwitter已删除以下功能：
- 点赞（GitHub Reactions）功能
- 评论系统（评论、回复、编辑、删除）
- 切换GitHub仓库功能
- 彩蛋功能

## 维护更新

当您更新Gwitter仓库代码时，Vercel会自动检测变更并重新部署。也可以在Vercel仪表盘中手动触发新的部署。

---

如果您在部署过程中遇到任何问题，请在GitHub仓库中创建Issue。 