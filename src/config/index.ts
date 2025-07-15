import { GwitterConfig } from '../types/global';

// 从环境变量中获取配置，如果存在的话
const getEnvConfig = () => {
  // 尝试从环境变量中获取token
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const tokenParts = token ? [token.slice(0, token.length / 2), token.slice(token.length / 2)] : undefined;

  return {
    token: tokenParts,
    clientID: process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET || process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    owner: process.env.GITHUB_OWNER || process.env.NEXT_PUBLIC_GITHUB_OWNER,
    repo: process.env.GITHUB_REPO || process.env.NEXT_PUBLIC_GITHUB_REPO,
    autoProxy: process.env.CORS_PROXY || process.env.NEXT_PUBLIC_CORS_PROXY,
  };
};

// 环境变量配置
const envConfig = getEnvConfig();

let config = {
  request: {
    token: envConfig.token || ['9c48ed2297d7d9bf9447', '6de723dbf1a6e4adeacd'],
    clientID: envConfig.clientID || '56af6ab05592f0a2d399',
    clientSecret: envConfig.clientSecret || '5d7e71a1b6130001e84956420ca5b88bc45b7d3c',
    pageSize: 6,
    autoProxy: envConfig.autoProxy || 
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
    owner: envConfig.owner || 'SimonAKing',
    repo: envConfig.repo || 'weibo',
  },

  app: {
    onlyShowOwner: false,
    enableRepoSwitcher: true,
    enableAbout: false,
    enableEgg: false,
  },
};

export function setConfig(newConfig: GwitterConfig) {
  if (newConfig.request) {
    config.request = {
      ...config.request,
      ...newConfig.request,
    };
  }

  if (newConfig.app) {
    config.app = {
      ...config.app,
      ...newConfig.app,
    };
  }
}

export default config;
