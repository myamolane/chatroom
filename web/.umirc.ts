import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  cssModulesTypescriptLoader: {},
  cssLoader: {
    localsConvention: 'camelCase'
  },
  theme: {
    '@border-color': '#dee0e3'
  },
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001/',
      'changeOrigin': true,
    },
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home' },
    { path: '*', component: '@/pages/index' },
  ],
});
