<template>
  <div>
     {{msg}}
  </div>
</template>

<script setup>
import { demoApi } from "./network/demo.js"
import { customRef } from "vue"  //自定义hook

// 使用自定义hook在完成网络请求后进行数据绑定和数据更新
function getData(){
  return customRef((track,trigger) => {
    let msg = ""
    demoApi.getDemoJson().then(res => {
      msg = res.data.message
      trigger()  //触发视图更新
    })
    return {
      get(){
        track()  //跟踪视图的变化
        return msg
      }
    }
  })
}

let msg = getData()

</script>

<style scoped>

</style>