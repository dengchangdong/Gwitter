/* eslint-env node */
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

const external = ['react', 'react-dom', 'react-dom/client'];
const NODE_ENV = process.env.NODE_ENV || 'production';

const commonPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    preventAssignment: true,
  }),
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs(),
  json(),
  postcss({
    extract: true,
    minimize: true,
    modules: false,
  }),
];

export default [
  // UMD build
  {
    input: 'src/gwitter.ts',
    output: {
      file: 'dist/gwitter.min.js',
      format: 'umd',
      name: 'gwitter',
      sourcemap: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',
      },
    },
    external,
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
        outDir: 'dist',
        exclude: ['**/*.test.ts', '**/*.test.tsx', 'dist/**/*', 'src/lib/**/*'],
      }),
      terser(),
    ],
  },
  // ESM build
  {
    input: 'src/gwitter.ts',
    output: {
      file: 'dist/gwitter.esm.js',
      format: 'es',
      sourcemap: false,
    },
    external,
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
        outDir: 'dist',
        exclude: ['**/*.test.ts', '**/*.test.tsx', 'dist/**/*', 'src/lib/**/*'],
      }),
      terser(),
    ],
  },
  // Types build
  {
    input: 'src/gwitter.ts',
    output: {
      file: 'dist/gwitter.d.ts',
      format: 'es',
    },
    external: [
      ...external,
      '@emotion/react',
      '@emotion/styled',
      'react-i18next',
      'i18next',
      'i18next-browser-languagedetector',
      'framer-motion',
      'date-fns',
      'date-fns/locale',
      'axios',
      'balloons-js',
      '@number-flow/react',
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        preventAssignment: true,
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      json(),
      postcss({
        extract: false,
        minimize: false,
        modules: false,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationMap: false,
        emitDeclarationOnly: true,
        outDir: 'dist',
        exclude: ['**/*.test.ts', '**/*.test.tsx', 'dist/**/*', 'src/lib/**/*'],
      }),
    ],
  },
];
