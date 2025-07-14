# Gwitter 部署到 Cloudflare Workers 指南

本文档提供将 Gwitter 应用部署到 Cloudflare Workers 的详细步骤。

## 准备工作

1. 创建 [Cloudflare 账号](https://dash.cloudflare.com/sign-up)
2. 安装 Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```
3. 登录到 Cloudflare：
   ```bash
   wrangler login
   ```

## 配置环境变量

在部署前，需要在 Cloudflare Workers 仪表板上设置以下环境变量：

1. `GITHUB_CLIENT_ID` - GitHub OAuth 应用的客户端 ID
2. `GITHUB_CLIENT_SECRET` - GitHub OAuth 应用的客户端密钥

或者，您可以直接在 `wrangler.toml` 文件中填写这些值。

## GitHub OAuth 应用设置

1. 在 GitHub 上创建一个新的 OAuth 应用：https://github.com/settings/applications/new
2. 应用名称：`Gwitter`
3. 主页 URL：填写你的 Cloudflare Workers 域名，例如：`https://gwitter.your-username.workers.dev`
4. 授权回调 URL：`https://gwitter.your-username.workers.dev`
5. 创建应用后，生成客户端密钥

## 构建与部署

1. 安装依赖：
   ```bash
   npm install
   ```
   或
   ```bash
   pnpm install
   ```

2. 构建项目：
   ```bash
   npm run build
   ```

3. 部署到 Cloudflare Workers：
   ```bash
   npm run deploy:worker
   ```

部署完成后，您的应用将可以通过 `https://gwitter.your-username.workers.dev` 访问。

## 本地开发测试

可以在本地测试 Worker：
```bash
npm run dev:worker
```

## 自定义域名设置

1. 在 Cloudflare Workers 仪表板中找到您的 Worker
2. 点击"触发器"选项卡
3. 在"自定义域"部分添加您的域名

## 故障排除

如果遇到问题：

1. 检查 GitHub OAuth 应用的回调 URL 是否正确
2. 确认环境变量已正确设置
3. 查看 Workers 日志以获取错误信息

## 限制与注意事项

1. Cloudflare Workers 免费计划每天有 100,000 次请求限制
2. 单个请求的执行时间上限为 10ms（付费计划为 50ms）
3. Worker 内存限制为 128MB 