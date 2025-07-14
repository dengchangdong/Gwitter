import { GwitterConfig } from '../types/global';

// 获取环境变量，只使用浏览器环境兼容的方法
const getEnv = (key: string, defaultValue: string): string => {
  // 检查是否在浏览器环境中有window.__ENV__对象 (Vercel运行时注入)
  if (typeof window !== 'undefined' && (window as any).__ENV__ && (window as any).__ENV__[key]) {
    return (window as any).__ENV__[key];
  }
  
  // 检查是否有import.meta.env (Vite等构建工具)
  const importMeta = (import.meta as any).env;
  if (importMeta && importMeta[key]) {
    return importMeta[key];
  }
  
  return defaultValue;
};

let config = {
  request: {
    token: [
      getEnv('GITHUB_TOKEN_PART1', '9c48ed2297d7d9bf9447'),
      getEnv('GITHUB_TOKEN_PART2', '6de723dbf1a6e4adeacd'),
    ],
    clientID: getEnv('GITHUB_CLIENT_ID', '56af6ab05592f0a2d399'),
    clientSecret: getEnv('GITHUB_CLIENT_SECRET', '5d7e71a1b6130001e84956420ca5b88bc45b7d3c'),
    pageSize: 6,
    autoProxy: getEnv(
      'AUTO_PROXY',
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token'
    ),
    owner: getEnv('GITHUB_OWNER', 'SimonAKing'),
    repo: getEnv('GITHUB_REPO', 'weibo'),
  },

  app: {
    onlyShowOwner: getEnv('ONLY_SHOW_OWNER', 'false') === 'true',
    enableRepoSwitcher: getEnv('ENABLE_REPO_SWITCHER', 'true') === 'true',
    enableAbout: getEnv('ENABLE_ABOUT', 'false') === 'true',
    enableEgg: getEnv('ENABLE_EGG', 'false') === 'true',
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
