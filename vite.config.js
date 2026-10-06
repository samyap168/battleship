import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { host: true, port: 5173 },
  build: { target: ['es2022', 'safari15', 'firefox115', 'chrome100', 'edge100'], chunkSizeWarningLimit: 2000 },
});
