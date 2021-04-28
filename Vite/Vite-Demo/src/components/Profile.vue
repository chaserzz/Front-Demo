<template>
  <div>
    <span>Profile组件</span>
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script setup >
import { defineProps , ref, } from 'vue'

defineProps({
  msg:{
    type:String,
    default: "ss"
  }
})


</script>

<style scoped>

</style>