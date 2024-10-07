<template>
  <button
      :type="type"
      :disabled="disabled"
      @click="handleClick"
      :class="[
      'text-sm px-3 py-1 rounded-full shadow-md focus:outline-none focus:ring-2 transition duration-300 ease-in-out transform',
      {
        'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-300 hover:scale-105': !disabled,
        'bg-gray-400 text-gray-700 cursor-not-allowed': disabled,
        'relative bg-sky-600/30 h-8 w-20 pl-16 pt-4': isLoading
      },
      customClasses
    ]"
  >
    <template v-if="!isLoading">
      <slot v-if="name === undefined"/>
      <span v-if="name !== undefined">{{ name }}</span>
    </template>
    <template v-else>
      <SpinnerLoading size="small" colorProp="grey"/>
    </template>
  </button>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
import SpinnerLoading from "@/components/SpinnerLoading.vue";

const props = defineProps({
  name: {
    type: String,
  },
  isLoading: {
    type: Boolean,
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customClasses: {
    type: String,
    default: '',
  }
});

const emits = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emits('click', event);
  }
};

</script>

<style scoped>
/* Add custom styles if necessary */
</style>
