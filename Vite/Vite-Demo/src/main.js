import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from "./store/index"

const APP = createApp(App);


APP.use(router).use(store).mount('#app')