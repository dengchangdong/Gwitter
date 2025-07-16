import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './i18n';
import { setConfig } from './config';
import type { iMemosOptions } from './types/global';

// Create root outside of the functions to avoid re-creating it
let root: ReactDOM.Root | null = null;

function renderiMemos(container: HTMLElement) {
  if (!root) {
    root = ReactDOM.createRoot(container);
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Return a cleanup function
  return () => {
    if (root) {
      root.unmount();
      root = null;
    }
  };
}

function iMemos(options: iMemosOptions = {}) {
  const { container: containerOption, config = {} } = options;
  const container = typeof containerOption === 'string' ? document.querySelector(containerOption) : containerOption;

  if (!container) {
    console.error('iMemos: Container element not found');
    return Promise.reject(new Error('Container element not found'));
  }

  // Set configuration
  setConfig(config);

  // Render the app
  return renderiMemos(container);
}

// Add to window for UMD usage
if (typeof window !== 'undefined') {
  window.iMemos = iMemos;
}

export default iMemos; 