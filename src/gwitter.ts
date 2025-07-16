import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthWindow from './AuthWindow';
import { setConfig } from './config';
import './i18n';
import type { GwitterOptions } from './types/global';
import { parseUrl } from './utils';

let gwitterInstance: ReactDOM.Root | null = null;

function renderGwitter(container: HTMLElement) {
  const params = parseUrl();
  let component = App;
  if (params.code) {
    component = AuthWindow;
  }

  if (gwitterInstance) {
    gwitterInstance.unmount();
  }

  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(component));

  gwitterInstance = root;

  return root;
}

function gwitter(options: GwitterOptions = {}) {
  const container = options.container || document.getElementById('gwitter');
  if (!container) {
    console.error('Gwitter: Container element not found');
    return;
  }

  setConfig(options.config || {});

  return renderGwitter(container);
}

if (typeof window !== 'undefined') {
  window.gwitter = gwitter;
}

export default gwitter;
