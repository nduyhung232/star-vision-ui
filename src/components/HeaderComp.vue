<template>
  <header class="text-white text-3xl p-3 mb-5 bg-primary">
    <div>{{ title }}</div>
  </header>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>

</style>