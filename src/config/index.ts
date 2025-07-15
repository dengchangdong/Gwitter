import { GwitterConfig } from '../types/global';

// 从环境变量或默认值获取配置
const getEnvVar = (key: string, defaultValue: string): string => {
  if (typeof window !== 'undefined' && (window as any).__ENV__ && (window as any).__ENV__[key]) {
    return (window as any).__ENV__[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
};

let config = {
  request: {
    token: [
      getEnvVar('GITHUB_TOKEN_PART1', '9c48ed2297d7d9bf9447'), 
      getEnvVar('GITHUB_TOKEN_PART2', '6de723dbf1a6e4adeacd')
    ],
    clientID: getEnvVar('GITHUB_CLIENT_ID', '56af6ab05592f0a2d399'),
    clientSecret: getEnvVar('GITHUB_CLIENT_SECRET', '5d7e71a1b6130001e84956420ca5b88bc45b7d3c'),
    pageSize: Number(getEnvVar('PAGE_SIZE', '6')),
    autoProxy: getEnvVar(
      'OAUTH_PROXY',
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token'
    ),
    owner: getEnvVar('GITHUB_OWNER', 'SimonAKing'),
    repo: getEnvVar('GITHUB_REPO', 'weibo'),
  },

  app: {
    onlyShowOwner: getEnvVar('ONLY_SHOW_OWNER', 'false') === 'true',
    enableRepoSwitcher: getEnvVar('ENABLE_REPO_SWITCHER', 'true') === 'true',
    enableAbout: getEnvVar('ENABLE_ABOUT', 'false') === 'true',
    enableEgg: getEnvVar('ENABLE_EGG', 'false') === 'true',
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
