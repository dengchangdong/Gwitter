import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthWindow from './AuthWindow';
import { setConfig } from './config';
import './i18n';
import type { GwitterOptions } from './types/global';
import { parseUrl } from './utils';

let gwitterInstance: ReactDOM.Root | null = null;

// 性能监测函数
function reportPerformance() {
  if (typeof window === 'undefined' || !window.performance) return;

  // 记录关键时间点
  window.performance.mark('gwitter-init-start');
  
  // 监测LCP
  if ('PerformanceObserver' in window) {
    try {
      // 优化LCP监测
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // 输出详细LCP信息到控制台
        console.log('[性能] LCP:', Math.round(lastEntry.startTime) / 1000, '秒');
                    
        // 如果LCP值不佳，尝试优化
        if (lastEntry.startTime > 2500) {
          console.warn('[性能警告] LCP值较高，考虑进一步优化');
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.error('[性能] LCP监测失败:', e);
    }
  }
}

// 预热和优化加载
function optimizeInitialLoad() {
  // 预取文档标题
  if (typeof document !== 'undefined' && document.title) {
    // 强制浏览器尽早处理文档标题
    const title = document.title;
    requestAnimationFrame(() => {
      document.title = title;
    });
  }
  
  // 如果支持，使用requestIdleCallback在浏览器空闲时预加载组件
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const requestIdleCallback = (window as any).requestIdleCallback;
    requestIdleCallback(() => {
      // 触发App组件的预加载
      import('./App').catch(e => console.error('预加载App失败:', e));
    });
  }
}

function renderGwitter(container: HTMLElement) {
  // 记录渲染开始时间
  const renderStartTime = performance.now();
  
  const params = parseUrl();
  let component = App;
  if (params.code) {
    component = AuthWindow;
  }

  if (gwitterInstance) {
    gwitterInstance.unmount();
  }

  // 使用并发模式提升渲染性能
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(component));

  gwitterInstance = root;
  
  // 记录渲染完成时间
  window.performance.mark('gwitter-render-complete');
  window.performance.measure('gwitter-render-time', 'gwitter-init-start', 'gwitter-render-complete');
  
  const renderTime = performance.now() - renderStartTime;
  console.log('[性能] Gwitter渲染时间:', Math.round(renderTime), 'ms');

  return root;
}

function gwitter(options: GwitterOptions = {}) {
  // 启动性能监测
  reportPerformance();
  
  // 优化初始加载
  optimizeInitialLoad();
  
  const container = options.container || document.getElementById('gwitter');
  if (!container) {
    console.error('Gwitter: Container element not found');
    return;
  }

  setConfig(options.config || {});

  // 使用requestAnimationFrame确保在下一帧渲染，避免阻塞主线程
  return requestAnimationFrame(() => {
    return renderGwitter(container);
  });
}

if (typeof window !== 'undefined') {
  window.gwitter = gwitter;
  
  // 自动运行gwitter以加速初始化
  document.addEventListener('DOMContentLoaded', () => {
    if (!gwitterInstance && document.getElementById('gwitter')) {
      gwitter();
    }
  });
}

export default gwitter;
