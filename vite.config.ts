import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // base 경로를 설정하여 빌드 결과물의 에셋 참조 경로를 변경합니다.
  // 예: /client/assets/index.js
  base: '/client/', 
  resolve: {
    alias: {
      '@fe': path.resolve(__dirname, './frontend'),
      '@': path.resolve(__dirname, './src'),
    }
  }
})
