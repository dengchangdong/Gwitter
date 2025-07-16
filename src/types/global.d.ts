export interface iMemosConfig {
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

export interface iMemosOptions {
  container?: HTMLElement;
  config?: iMemosConfig;
}

declare global {
  interface Window {
    iMemos?: (options?: iMemosOptions) => void;
  }
}
