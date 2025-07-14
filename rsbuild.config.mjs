import { defineConfig } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

export default defineConfig({
  dev: {
    port: 3030,
  },
  source: {
    entry: {
      index: './src/index.tsx',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    },
    preEntry: ['./src/i18n/index.ts'],
  },
  output: {
    filenameHash: true,
    minify: process.env.NODE_ENV === 'production',
    // 为 Cloudflare Workers 设置正确的公共路径
    assetPrefix: process.env.CF_PAGES === 'true' ? '/' : undefined,
  },
  server: {
    cors: true,
    open: false,
    historyApiFallback: true,
  },
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  tools: {
    less: {},
    cssLoader: {
      modules: {
        auto: true,
        exportLocalsConvention: 'camelCase',
      },
    },
    postcss: (config) => {
      // https://github.com/postcss/postcss-import
      config.plugins = (config.plugins ?? []).concat([
        require('postcss-import')({
          path: [path.join(__dirname, 'src')],
        }),
        require('postcss-url')({
          url: 'rebase',
        }),
      ]);
    },
  },
  plugins: [pluginReact(), pluginLess()],
});
