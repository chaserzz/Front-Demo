<template>
  <div>
    <div>
      <span>我是视图，最外侧的组件</span>
      <div>
        <span>{{message}}</span>
      </div>
    </div>
    <div style="margin-top: 15px;">
      <span>这里是父子组件所在的地方</span>
      <father />
    </div>
  </div>
</template>

<script setup>
import father from "./fatherCom.vue"

import { getCurrentInstance , onBeforeMount, onDeactivated, ref } from "vue"
let app = getCurrentInstance()   //获得App对象
let message = ref("")  //设置一个message的变量
function showMessage(payload){
  message.value = payload  
}
//在beforeMount这个生命周期函数时开始监听childClick事件
onBeforeMount(() => {
  app.ctx.$bus.$on("childClick",showMessage)   
})

//在deactived这个生命周期函数时取消事件订阅
onDeactivated(() => {
  app.ctx.$bus.$off("childClick")
})
</script>

<style scoped>

</style>