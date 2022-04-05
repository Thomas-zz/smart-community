import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/var.scss";',
      },
    },
  },
  server: {
    // proxy: {
    //   '/reception': {
    //     target: 'http://101.43.4.133:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/reception/, ''),
    //   },
    // },
  },
})
