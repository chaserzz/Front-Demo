<template>
  <div>
    这是展示Watch和WatchEffect的Demo
    <ul>
      <li @click="triggerEffect">
        {{watchEffectMsg}}
      </li>
      <li @click="triggerWatch">
        {{watchMsg}}
      </li>
    </ul>
    <button @click="stopEffect">点击取消watchEffect</button>
    <button @click="stopWatch">点击取消watch</button>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch } from "vue"

let watchEffectMsg = ref("点我触发WatchEffect函数")
let watchMsg = ref("点我出发Watch函数")

// 使用WatchEffect，接收一个回调后会立即执行，之后监听    返回一个stop的函数，执行后取消监听
let stop = watchEffect(()=>{
  watchEffectMsg.value;  //监听watchEffect
  console.log(watchEffectMsg.value);
})

//watch(监听的数据，监听的回调)  返回一个stop的函数，执行后取消监听
let stop2 = watch([watchMsg],(newVal,oldVal)=>{
  console.log(newVal,oldVal);
})


//通过Math.random触发watch
function triggerEffect(){
  watchEffectMsg.value = Math.random()
}
function triggerWatch(){
  watchMsg.value = Math.random()
}

//
function stopEffect(){
  stop()
}

function stopWatch(){
  stop2()
}
</script>

<style scoped>

</style>