<template>
  <HeaderComp :title="'Canny Page'"/>
  <div class="flex items-center p-4">
    <input type="file" @change="onFileChange" accept=".png;.jpg"/>
    <CommonButton
        @click="applyCanny()"
        name="Apply Canny"
        :custom-classes="'py-4'"
    >
    </CommonButton>
  </div>
  <div class="flex h-1/5.
">
    <div class="mx-1">
      <ImageComp v-if="model.imageOriginView" title="Original Image" :source="model.imageOriginView" alt="Uploaded Image"/>
    </div>
    <div class="mx-1">
      <ImageComp v-if="model.resultImage" title="Result Image" :source="model.resultImage" alt="Uploaded Image"/>
    </div>
  </div>
  <div class="">
    <div class="mx-1">
      <ImageComp v-if="model.histogram" title="Histogram Image" :source="model.histogram" alt="Uploaded Image"/>
    </div>
  </div>


</template>

<script setup>
import HeaderComp from "@/components/HeaderComp.vue";
import CommonButton from "@/components/CommonButton.vue";
import {reactive} from "vue";
import ImageComp from "@/components/ImageComp.vue";
import axios from "axios";

const model = reactive({
  imageOriginView: null,
  imageOrigin: null,
  histogram: null,
  resultImage: null
})

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      model.imageOriginView = e.target.result;
    };
    model.imageOrigin = file;
    model.histogram = null;
    model.resultImage = null;
    reader.readAsDataURL(file);
  }
};

const applyCanny = async () => {
  const url = 'http://localhost:5000/api/v1.0/canny';

  const formData = new FormData();
  formData.append('image', model.imageOrigin);

  try {
    const response = await axios.post(url, formData, {});
    model.histogram = 'http://localhost:5000' + response.data.histogram_url
    model.resultImage = 'http://localhost:5000' + response.data.thresholded_image_url
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  }
}

</script>

<style>

</style>