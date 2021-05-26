<template>
  <div>
    <section>
      <p>这是store中的count:</p>
      {{count}}
    </section>
     <section>
       <button @click="addCount"> + </button> 
       <button @click="subCount"> - </button>
     </section>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore} from "vuex"   //将storeHook导入
import { ADD_COUNT, SUB_COUNT } from "./store/mutations_type"
const store = useStore()

//使用计算属性
let count = computed(() => {
  return store.getters.getCount
})

//同步函数使用commit来进行触发
function addCount(){
  store.dispatch("add_count")
  // store.commit(ADD_COUNT)
}
//异步函数中使用dispatch来进行派发，这里的异步函数基本是指网络请求
function subCount(){
  // store.dispatch("sub_count")
  store.commit(SUB_COUNT)
}

</script>

<style scoped>

</style>