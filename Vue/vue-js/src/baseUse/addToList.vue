<template>
  <form>
    <el-input type="text" @change="handleInputChange" v-model="inputValue" style="width: 200px"/>
    <el-button type="primary" @click="addEvent" style="display: block;margin: 8px auto;"> 添加 </el-button>
  </form>
</template>

<script lang="ts" setup>
import { defineEmit } from "vue"
import { ref } from "vue"
let inputValue = ref<string>("") 

//在用defineEmit定义发送的事件名称，会返回一个emit对象
const emit = defineEmit(['addEvent'])

function addEvent(e){
  e.preventDefault();
  if(inputValue.value !== ""){
    emit("addEvent",inputValue.value)
    inputValue.value = ""
  }else{
    
  }
}


</script>

<style lang="scss">

</style>