<template>
  <HeaderComp :title="'Otsu Page'"/>
  <div class="flex items-center p-4">
    <CommonButton
        @click="openPopup"
        name="Upload Image"
        :custom-classes="'py-4'"
    >
    </CommonButton>
    <FileUpload v-model="selectedFile"/>
  </div>
  <div class="flex">
    <div class="flex"></div>
    <div class="flex"></div>
    <div class="flex"></div>
  </div>
  <ImageRes
      v-if="model.imageRes"
      title="Predicted Image"
      :source="model.imageRes"
      alt="Predicted Image"
      :points="model.points"
      :coordArray="model.coord"
      :strokeLine="model.strokeLine"
  />

</template>

<script setup>
import HeaderComp from "@/components/HeaderComp.vue";
import CommonButton from "@/components/CommonButton.vue";
import FileUpload from "@/components/FileUpload.vue";
import {ref} from "vue";
import ImageRes from "@/components/ImageRes.vue";

const selectedFile = ref(null);

</script>

<style>

</style>