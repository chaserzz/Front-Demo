<template>
  <demo :list="list" />
</template>

<script lang="ts">
import Demo,{ IListItem } from '@components/Demo.vue'
import { defineComponent, reactive, toRaw } from "vue"
export default defineComponent({
  name: "App",
  components:{
    Demo
  },
  setup(props,context) {
    const list = reactive<IListItem[]>([{
      id:12312,
      message:"1231321"
    }])
    const DemoList = toRaw(list)
    return {
      list,
      DemoList
    }
  }
})

</script>
