<template>
  <div>
    <section>
      <router-link class="routerLink" to="/base">基础使用</router-link>
      <router-link class="routerLink" to="/vuex">VueX</router-link>
      <router-link class="routerLink" to="/axios">axios发送网络请求</router-link>
      <router-link class="routerLink" to="/eventbus">事件BUS</router-link>
      <router-link class="routerLink" to="/directive">自定义指令</router-link>
      <router-link class="routerLink" to="/template">作用域插槽</router-link>
      <router-link class="routerLink" to="/watch">Watch和WatchEffect</router-link>
      <router-link class="routerLink" to="/providerAndInject">Provide和Inject</router-link>
    </section>
    <hr />
    <router-view style="margin-top: 20px;" />
  </div>
</template>

<script setup>

</script>

<style scoped>
  .routerLink{
    margin-left: 8px;
    text-decoration: none;
  }
</style>