<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{item}} &nbsp;&nbsp;&nbsp;
      <slot :prop="item" :index="index">  <!--将item和index作为参数传回到父组件中-->
      </slot>
    </li>
  </ul>
</template>

<script setup>
  import { defineProps } from "vue"

  defineProps({
    list:{
      type: Array,
      default: []
    }
  })
</script>

<style scoped>

</style>