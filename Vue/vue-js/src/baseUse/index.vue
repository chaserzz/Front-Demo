<template>
  <add-to-list  @addEvent="addEvent" />
  <show-list :list="list" @deleteEvent="deleteEventByIndex"/>
  <Child message="message"/>
  <ul>
    <li v-for="(item,index) in arr" :key="index">
      {{item}}
    </li>
  </ul>
  <button @click="handleBtnClick">改变</button>
</template>

<script setup>
import { onRenderTracked, onRenderTriggered, reactive , ref , getCurrentInstance } from "vue"
import AddToList from "./addToList.vue"
import ShowList from "./showList.vue"
import Child from "./child.vue"
let list = reactive([ "Learn Math", "Sleep" ])
const arr = reactive([1,2,3,4])
const index = getCurrentInstance()
let refDemo = ref(0)
function addEvent(payload){
  list.push(payload)
}

function deleteEventByIndex(index){
  list.splice(index,1)
}

function handleBtnClick(){
  console.log(index);
  arr[0] = "change"
}

//在有新属性进行渲染之前调用
onRenderTracked(e => {
  console.log("e:",e);
})

//在修改之后
onRenderTriggered((target)=>{
  console.log(target);
})
</script>
