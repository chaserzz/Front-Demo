<template>
  <ul>
    <li v-for="item in list" :key="item.id" >{{item.message}}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent , PropType } from "vue"

export interface IListItem{
  id: number,
  message: string
}

export default defineComponent({
  name: "Demo",
  props:{
    list: {
      type: Array as PropType<IListItem[]>,
      default: [],
      required: true
    }
  },
  setup(props,context) {
    const { list } =  props
    console.log("Demo:",list)
    return {
      list
    }
  }
})

</script>
