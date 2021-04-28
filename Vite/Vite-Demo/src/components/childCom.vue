<template>
  <div>
    <span>{{msg}}</span>
    <div style="margin-top: 20px;">
      <span>{{count}}</span>
      <button @click="changeCount">点击count++</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref,} from 'vue'
let count = ref(0)
function changeCount(){
  count.value++
}
defineProps({
  msg:String,
})

</script>

<style scoped>

</style>