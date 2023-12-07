import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 详细配置信息 https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                },
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                // target: 'http://127.0.0.1:8666/',
                target: 'https://open.doodo.cn/',
                rewrite: path => path.replace(/^\/api/, ''),
                changeOrigin: true,
            }
        }
    }
})
