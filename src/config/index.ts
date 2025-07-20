import { GwitterConfig } from '../types/global';

let config = {
  request: {
    token: ['ghp_o9jmC64SgaWPUGb', 'Ysrj02n6TI2EuDY4b8a1y'],
    clientID: 'Ov23liRjkEOeTjxGbsZj',
    clientSecret: 'f8e1b0580ff5d383e5c7d2af1582123acf0fca62',
    pageSize: 6,
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
    owner: 'DCDsNotes',
    repo: 'NotesSource',
  },

  app: {
    onlyShowOwner: false
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
