import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': 'http://localhost:8080' //api로 시작하는 요청은 localhost:8080으로 프록시 처리
    }
  }
})
