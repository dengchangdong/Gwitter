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

// 解析字符串为布尔值
const parseBoolean = (value: string): boolean => {
  return value.toLowerCase() === 'true';
};

let config = {
  request: {
    token: [
      getEnvVar('GITHUB_TOKEN_PART1', 'ghp_21hwOey4nqFaHarp'), 
      getEnvVar('GITHUB_TOKEN_PART2', 'TNYgw4C12HrL8T1P6gRE')
    ],
    clientID: getEnvVar('GITHUB_CLIENT_ID', 'Ov23liZ8fUlrF8cFjn6y'),
    clientSecret: getEnvVar('GITHUB_CLIENT_SECRET', 'd1b3980ee38c3152628a37687b2ae8b81633e49b'),
    pageSize: Number(getEnvVar('PAGE_SIZE', '6')),
    autoProxy: getEnvVar(
      'OAUTH_PROXY',
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token'
    ),
    owner: getEnvVar('GITHUB_OWNER', 'dengchangdong'),
    repo: getEnvVar('GITHUB_REPO', 'IssuesMemos'),
  },

  app: {
    onlyShowOwner: parseBoolean(getEnvVar('ONLY_SHOW_OWNER', 'false')),
    enableAbout: parseBoolean(getEnvVar('ENABLE_ABOUT', 'false')),
    siteName: getEnvVar('SITE_NAME', '归零杂记'),
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
