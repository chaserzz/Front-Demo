<template>
  <div>
    我是一个子组件{{message}}
  </div>
</template>

<script>
export default {
  name: 'Child',
  props:{
    message:{
      type: String
    }
  },
  setup(props,context) {
    console.log(props,context);
    const { message } = props
    return {
      message
    }
  }
}
</script>

<style scoped>

</style>