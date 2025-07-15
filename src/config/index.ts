import { GwitterConfig } from '../types/global';

// 从环境变量或默认值获取配置
const getEnvVar = (key: string, defaultValue?: string): string => {
  if (typeof window !== 'undefined' && (window as any).__ENV__ && (window as any).__ENV__[key]) {
    return (window as any).__ENV__[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] || defaultValue || '';
  }
  return defaultValue || '';
};

// 检查必要的环境变量
const checkRequiredEnvVars = () => {
  const requiredVars = [
    'GITHUB_TOKEN',
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'GITHUB_OWNER',
    'GITHUB_REPO'
  ];
  
  const missingVars = requiredVars.filter(varName => !getEnvVar(varName));
  if (missingVars.length > 0) {
    console.error(`错误: 缺少必要的环境变量: ${missingVars.join(', ')}`);
    return false;
  }
  return true;
};

const isEnvValid = checkRequiredEnvVars();

// 获取GitHub Token，确保安全处理，以字符串数组形式返回
const getSecureToken = (): string[] => {
  const token = getEnvVar('GITHUB_TOKEN');
  // 不再拆分token，但保持数组格式以兼容现有代码
  return [token];
};

let config = {
  request: {
    token: getSecureToken(),
    clientID: getEnvVar('GITHUB_CLIENT_ID'),
    clientSecret: getEnvVar('GITHUB_CLIENT_SECRET'),
    pageSize: Number(getEnvVar('PAGE_SIZE', '6')),
    autoProxy: getEnvVar(
      'OAUTH_PROXY',
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token'
    ),
    owner: getEnvVar('GITHUB_OWNER'),
    repo: getEnvVar('GITHUB_REPO'),
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
