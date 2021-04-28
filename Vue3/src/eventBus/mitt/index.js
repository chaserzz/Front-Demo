//将以下代码复制到main.js中可以在原型中使用mitt
/** 
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import mitt from "mitt"

const emitter = mitt()
const bus = {}
bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit

const APP = createApp(App)
APP.config.globalProperties.$bus = bus
APP.mount('#app')

**/
