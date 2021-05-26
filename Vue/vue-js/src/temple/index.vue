<template>
  <childCom :list="arr">
    <template v-slot:default="slotProps">  <!--Vue3 舍弃了slot-scope--->
      <button @click="handleBtnClick(slotProps)">{{msg[slotProps.index]}}</button>
    </template>
  </childCom>
</template>

<script setup>
import childCom from "./todoList.vue"
import { reactive } from "vue"

let arr = ["read a book","work","game"]
let msg = reactive(["我是父组件中的button1,请点击","我是父组件中的button2,请点击","我是父组件中的button3,请点击"])
function handleBtnClick(slotProps){
  msg[slotProps.index] = slotProps.prop
}

</script>

<style scoped>

</style>