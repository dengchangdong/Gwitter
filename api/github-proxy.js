// GitHub API 代理服务
// 此文件将被部署为 Vercel Serverless Function

import axios from 'axios';

export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // 处理OPTIONS请求（预检请求）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 获取请求路径（去掉/api/github-proxy前缀）
    const githubPath = req.url.replace(/^\/api\/github-proxy/, '');
    
    // 构建GitHub API请求URL
    const githubUrl = `https://api.github.com${githubPath}`;
    
    // 获取所有请求头
    const headers = { ...req.headers };
    
    // 删除与代理相关的头信息
    delete headers.host;
    delete headers['x-forwarded-host'];
    delete headers['x-forwarded-proto'];
    delete headers['x-forwarded-port'];
    delete headers['x-vercel-deployment-url'];
    delete headers['x-vercel-forwarded-for'];
    delete headers.connection;
    
    // 设置GitHub API所需的请求头
    if (!headers.accept) {
      headers.accept = 'application/vnd.github.v3+json';
    }

    // 构建请求选项
    const requestOptions = {
      method: req.method,
      headers,
      responseType: 'stream',
    };

    // 如果有请求体，添加到请求选项中
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      requestOptions.data = req.body;
    }

    // 发送请求到GitHub API
    const response = await axios({
      url: githubUrl,
      ...requestOptions,
    });

    // 转发GitHub API的响应头
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // 返回GitHub API的响应状态和内容
    res.status(response.status);
    response.data.pipe(res);
  } catch (error) {
    console.error('GitHub API代理错误:', error);
    
    // 如果错误响应包含状态码和数据，则转发这些信息
    if (error.response) {
      Object.entries(error.response.headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.status(error.response.status).json({
        error: true,
        message: '代理请求失败',
        githubError: error.response.data
      });
    } else {
      // 如果没有响应对象，返回500错误
      res.status(500).json({
        error: true,
        message: '代理服务器内部错误',
        details: error.message
      });
    }
  }
} 