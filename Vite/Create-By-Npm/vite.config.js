import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
  plugins:[vue()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname,"src")  //将@指向src
    }
  },
  base: './',  //路径
  server:{
    port: 3002,  //打开的窗口
    open: true,  //是否自动打开浏览器
    cors: true  //是否允许跨域
  },
})
