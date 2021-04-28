<template>
  <ul>
    <li v-for="(item,index) in list" :key="item" @click="handleItemClick(index)">
      {{item}}
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmit } from "vue"

const prop = defineProps({
  list: Array
})

const emit = defineEmit(["deleteEvent"])

function handleItemClick(index){
  emit( "deleteEvent", index )
}

</script>

<style scoped>

</style>