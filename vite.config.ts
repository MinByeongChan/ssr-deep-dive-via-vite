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
  build: {
    emptyOutDir: false,
    rollupOptions: {
      // input: path.resolve(__dirname, 'frontend/index.html'),
      input: path.resolve(__dirname, 'frontend/prerenderIndex.html'),
    },
  },
})
// 기존 루트 앱(필요 시 유지)
// {
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@fe': path.resolve(__dirname, './frontend'),
//       '@': path.resolve(__dirname, './src'),
//     }
//   }
// },
// 프런트엔드 클라이언트 빌드

// 프런트엔드 SSR 빌드 (서버 엔트리)
// {
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@fe': path.resolve(__dirname, './frontend'),
//       '@': path.resolve(__dirname, './src'),
//     }
//   },
//   build: {
//     ssr: path.resolve(__dirname, 'frontend/src/entry-server.tsx'),
//     outDir: path.resolve(__dirname, 'dist/frontend/server'),
//     emptyOutDir: false,
//   },
// },
// // 프런트엔드 프리렌더용 SSR 빌드
// {
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@fe': path.resolve(__dirname, './frontend'),
//       '@': path.resolve(__dirname, './src'),
//     }
//   },
//   build: {
//     ssr: path.resolve(__dirname, 'frontend/src/entry-server-prerender.tsx'),
//     outDir: path.resolve(__dirname, 'dist/frontend/server'),
//     emptyOutDir: false,
//   },
// },
