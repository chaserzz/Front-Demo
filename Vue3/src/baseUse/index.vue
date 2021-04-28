<template>
  <add-to-list  @addEvent="addEvent" />
  <show-list :list="list" @deleteEvent="deleteEventByIndex"/>
</template>

<script setup>
import { reactive } from "vue"
import AddToList from "./addToList.vue"
import ShowList from "./showList.vue"
let list = reactive([ "Learn Math", "Sleep" ])

function addEvent(event){
  list.push(event)
}

function deleteEventByIndex(index){
  list.splice(index,1)
}

</script>
