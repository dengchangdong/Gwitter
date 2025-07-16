// GitHub OAuth 代理服务
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
    // 从请求体中获取 OAuth 所需的参数
    const { client_id, client_secret, code } = req.body || {};
    
    if (!client_id || !client_secret || !code) {
      return res.status(400).json({ 
        error: true, 
        message: '缺少必要参数：client_id, client_secret, code' 
      });
    }

    // 向 GitHub OAuth API 发送请求获取访问令牌
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id,
      client_secret,
      code
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // 将 GitHub 的响应直接返回给客户端
    res.status(200).json(response.data);
  } catch (error) {
    console.error('GitHub OAuth代理错误:', error);
    
    // 处理错误响应
    if (error.response) {
      res.status(error.response.status).json({
        error: true,
        message: 'OAuth请求失败',
        githubError: error.response.data
      });
    } else {
      res.status(500).json({
        error: true,
        message: '代理服务器内部错误',
        details: error.message
      });
    }
  }
} 