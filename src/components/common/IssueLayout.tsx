import React from 'react';

// 使用 Tailwind CSS 类名的 Issue 容器组件
export const IssueContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative my-2 flex rounded-lg">
      {children}
    </div>
  );
};

// 使用 Tailwind CSS 类名的 Issue 内容组件
export const IssueContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative z-10 m-1.5 flex-1 overflow-hidden rounded-lg border border-gray-100 bg-white/80 p-5 text-sm shadow-sm transition-all duration-300 ease-out">
      {children}
    </div>
  );
};

// 使用 Tailwind CSS 类名的 Issue 头部组件
export const IssueHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative mb-3 flex flex-wrap items-center">
      {children}
    </div>
  );
};

// 使用 Tailwind CSS 类名的 Issue 正文组件
export const IssueBody: React.FC<React.PropsWithChildren<{className?: string}>> = ({ children, className = '' }) => {
  return (
    <div className={`text-gray-800 ${className}`}>
      {children}
    </div>
  );
};

// 使用 Tailwind CSS 类名的 Issue 底部组件
export const IssueFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative mt-3 select-none text-base">
      {children}
    </div>
  );
};
