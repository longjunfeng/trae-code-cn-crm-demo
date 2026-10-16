import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({ root: 'web', plugins: [vue()], server: { port: 4174 }, build: { outDir: '../dist', emptyOutDir: true } });
