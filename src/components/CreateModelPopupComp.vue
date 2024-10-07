<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white rounded-lg px-6 pt-6 max-w-sm w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Create New Model</h2>
        <button @click="closePopup" class="text-gray-700">&times;</button>
      </div>
      <div class="mb-4">
        <CommonInput
            label="Model Name"
            placeholder="Enter your model name"
            v-model="name"
        />
        <div class="file-upload flex items-center mt-5 item">
          <FileUpload v-model="selectedFile"/>
          <CommonButton
              @click="submitFile"
              :disabled="!selectedFile || hasNameEmpty || isFileUploaded"
              name="Upload"
              :is-loading="isUploadBtnLoading"
              :customClasses="'h-8 w-28 text-xs bg-'"
          >
            <SpinnerLoading v-if="isUploadBtnLoading" size="small" colorProp="grey"/>
          </CommonButton>

        </div>
        <div class="flex justify-center mt-3">
          <CommonButton
              @click="trainingModel"
              :disabled="!isFileUploaded"
              name="Training"
          >
            <SpinnerLoading v-if="isTrainingBtnLoading" size="small" colorProp="grey"/>
          </CommonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, ref, computed} from 'vue';
import FileUpload from '@/components/FileUpload.vue';
import CommonInput from "@/components/CommonInput.vue";
import CommonButton from "@/components/CommonButton.vue";
import axios from "axios";
import SpinnerLoading from "@/components/SpinnerLoading.vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['close']);
const selectedFile = ref(null);
const isUploadBtnLoading = ref(false)
const isTrainingBtnLoading = ref(false)
const isFileUploaded = ref(false)

const closePopup = () => {
  emit('close');
};

const name = ref('');
const hasNameEmpty = computed(() => {
  return name.value.trim() === '';
});

const submitFile = async () => {
  const url = 'http://localhost:5000/api/v1.0/upload';
  isUploadBtnLoading.value = true;

  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('modelName', name.value.trim());

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    isFileUploaded.value = true;
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  } finally {
    isUploadBtnLoading.value = false;
  }
}

const trainingModel = async () => {
  const url = 'http://localhost:5000/api/v1.0/training';
  isTrainingBtnLoading.value = true

  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('modelName', name.value.trim());

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  } finally {
    isTrainingBtnLoading.value = false;
  }
}
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
