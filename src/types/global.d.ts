export interface GwitterConfig {
  request?: {
    token?: string[];
    clientID?: string;
    clientSecret?: string;
    pageSize?: number;
    autoProxy?: string;
    owner?: string;
    repo?: string;
    enableGithubApiProxy?: boolean;
    githubApiProxyUrl?: string;
  };
  app?: {
    siteName?: string;
  };
}

export interface GwitterOptions {
  container?: HTMLElement;
  config?: GwitterConfig;
}

declare global {
  interface Window {
    gwitter?: (options?: GwitterOptions) => void;
  }
}
