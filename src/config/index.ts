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
    token: envConfig.token || ['ghp_21hwOey4nqFaHar', 'pTNYgw4C12HrL8T1P6gRE'],
    clientID: envConfig.clientID || 'Ov23liZ8fUlrF8cFjn6y',
    clientSecret: envConfig.clientSecret || 'd1b3980ee38c3152628a37687b2ae8b81633e49b',
    pageSize: 6,
    autoProxy: envConfig.autoProxy || 
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
    owner: envConfig.owner || 'dengchangdong',
    repo: envConfig.repo || 'IssuesMemos',
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
