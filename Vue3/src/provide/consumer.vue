<template>
  <section>
    <p>consumer组件</p>
    <p>good的值: {{good}}</p>
  </section>
</template>

<script setup>
import { inject } from "vue"
let good = inject("good") 
</script>

<style scoped>

</style>