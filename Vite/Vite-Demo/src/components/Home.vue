<template>
  <div>
    <span>Home组件</span>
    <child-com modelValue="childMsg"/>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount, ref, getCurrentInstance,} from 'vue'
import childCom from './childCom.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import Mybus from '../utils/mitt'

let childMsg = ref("我是子组件的内容")
defineProps({
  msg:String,
})
 const { proxy } = getCurrentInstance()
onBeforeMount(()=>{
  console.log(Mybus);
  console.log(getCurrentInstance())
  console.log(useRoute())
  console.log(useRouter())
  console.log(useStore().state.counter)
})
</script>

<style scoped>

</style>