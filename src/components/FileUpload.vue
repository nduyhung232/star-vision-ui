<template>
  <input type="file" @change="onFileChange" accept=".zip, .rar" class=""/>
</template>

<script setup>
import {ref, watch} from 'vue';
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  modelValue: File,
});
const emit = defineEmits(['update:modelValue']);
const selectedFile = ref(props.modelValue);

watch(selectedFile, (newValue) => {
  emit('update:modelValue', newValue);
});

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
