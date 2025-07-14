import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * 处理静态资源请求的函数
 */
async function handleAsset(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    return new Response('资源未找到', { status: 404 });
  }
}

/**
 * 处理 GitHub API 代理请求
 */
async function handleApiProxy(request, url) {
  // 提取目标 URL 路径
  const targetPath = url.pathname.replace('/api/github/', '');
  const targetUrl = new URL(`https://api.github.com/${targetPath}`);
  
  // 复制原始查询参数
  url.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });
  
  // 创建代理请求
  const proxyRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow',
  });
  
  // 转发请求到 GitHub API
  const response = await fetch(proxyRequest);
  
  // 返回响应，添加 CORS 头
  return new Response(response.body, {
    status: response.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': response.headers.get('Content-Type') || 'application/json',
    },
  });
}

/**
 * 处理 OAuth 回调
 */
async function handleOAuthCallback(request, url) {
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response('缺少 code 参数', { status: 400 });
  }
  
  const clientId = GITHUB_CLIENT_ID; // 从环境变量获取
  const clientSecret = GITHUB_CLIENT_SECRET; // 从环境变量获取
  
  const tokenUrl = 'https://github.com/login/oauth/access_token';
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });
  
  const tokenData = await tokenResponse.json();
  
  return new Response(JSON.stringify(tokenData), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

/**
 * 处理所有请求的主函数
 */
async function handleRequest(event) {
  const request = event.request;
  const url = new URL(request.url);
  
  // 处理 GitHub API 代理请求
  if (url.pathname.startsWith('/api/github/')) {
    return handleApiProxy(request, url);
  }
  
  // 处理 OAuth 回调
  if (url.pathname === '/api/oauth/callback') {
    return handleOAuthCallback(request, url);
  }
  
  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  
  // 处理静态资源
  return handleAsset(event);
}

// 注册 Worker 处理函数
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
}); 