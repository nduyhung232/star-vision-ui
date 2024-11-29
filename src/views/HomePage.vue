<template>
  <HeaderComp :title="'Home Page'"/>
  <div class="flex items-center p-4 mt-10">
    <img src="../assets/image/home_bg.png">
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: 'HomePage',
  components: {HeaderComp}
};
</script>

<style scoped>
/* Styles cho Home view */
</style>
