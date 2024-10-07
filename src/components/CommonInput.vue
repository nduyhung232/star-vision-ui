<template>
  <div class="common-input w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="modelValue"
        @input="$emit('update:modelValue', modelValue)"
        class="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
});

// const emits = defineEmits(['update:modelValue']);

const modelValue = ref(props.modelValue);
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
