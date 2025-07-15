// Gwitter Configuration

export interface GwitterConfig {
  request: {
    token: string[];
    clientID: string;
    clientSecret: string;
    owner: string;
    repo: string;
    pageSize?: number;
    autoProxy?: string;
  };
  app?: {
    onlyShowOwner?: boolean;
    enableRepoSwitcher?: boolean;
    enableEgg?: boolean;
  };
}

// Default configuration
export const config: GwitterConfig = {
  request: {
    token: ['9c48ed2297d7d9bf9447', '6de723dbf1a6e4adeacd'],
    clientID: '56af6ab05592f0a2d399',
    clientSecret: '5d7e71a1b6130001e84956420ca5b88bc45b7d3c',
    pageSize: 6,
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
    owner: 'SimonAKing',
    repo: 'weibo',
  },
  app: {
    onlyShowOwner: true,
    enableRepoSwitcher: false,
    enableEgg: true,
  },
};
