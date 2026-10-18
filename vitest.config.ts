import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// 前端单元测试与集成测试配置：tests/单元测试 与 tests/集成测试
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    include: ['tests/单元测试/**/*.test.ts', 'tests/集成测试/**/*.test.ts'],
  },
});
