<template>
  <div id="direct">
    用来展示自定义指令
    <ul>
      <li>
        我没有绑定自定义指令
      </li>
      <li v-heighlight>  <!--heighlight自定义指令--->
        我绑定了自定义指令,通过自定义指令改变了字体颜色
      </li>
      <li style="color: #666">
        我没有绑定自定义指令，通过style改变字体颜色
      </li>
    </ul>
  </div>
</template>

<script setup>

</script>

<style lang="scss" >
ul{
  li{
    list-style: none;
  }
}
</style>
