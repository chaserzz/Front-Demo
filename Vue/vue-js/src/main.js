import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus"
import 'element-plus/lib/theme-chalk/index.css';
import store from './vuex/store'
import router from "./router/index"
import bus from "./bus/index"

import './index.css'


const app = createApp(App)
app.config.globalProperties.$bus = bus
//绑定自定义事件
app.directive('heighlight',{
  /**bind 为传入的payload，el为Dom元素，vnode为虚拟Dom元素  */
  beforeMount(el,binding,vnode){
    el.style.color = "#ccc"
  }
})

app.use(store).use(router).use(ElementPlus).mount('#app')
