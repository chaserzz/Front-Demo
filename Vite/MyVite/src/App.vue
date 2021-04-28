<template>
  <div>
    {{title}}
  </div>
</template>

<script>
  import { ref } from "vue"
  export default{
    name: "app",
    setup(){
      let title = ref("kvite打包成功")
      return {
        title
      }
    }
  }
</script>

<style scoped>

</style>