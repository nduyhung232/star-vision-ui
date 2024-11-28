<template>
  <HeaderComp :title="'Otsu Page'"/>
  <div class="flex items-center p-4">
    <input type="file" @change="uploadImage" accept="image/*"/>
    <CommonButton
        @click="applyThreshold()"
        name="Apply Threshold"
        :custom-classes="'py-4'"
    >
    </CommonButton>
  </div>
  <div class="flex h-1/5">
    <div class="mx-1">
      <ImageComp v-if="model.imageOriginView" title="Original Image" :source="model.imageOriginView" alt="Uploaded Image"/>
    </div>
    <div class="mx-1">
      <ImageComp v-if="model.histogram" title="Histogram Image" :source="model.histogram" alt="Uploaded Image"/>
    </div>
    <div class="mx-1">
      <ImageComp v-if="model.resultImage" title="Result Image" :source="model.resultImage" alt="Uploaded Image"/>
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

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.name.toLowerCase().includes("tiff") || file.name.toLowerCase().includes("tif")) {
      const formData = new FormData()
      formData.append('tiff_file', file)

      try {
        const response = await axios.post('http://localhost:5000/api/v1.0/convert', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer'
        })

        const blob = new Blob([response.data], {type: 'image/png'})
        model.imageOriginView = URL.createObjectURL(blob)
      } catch (error) {
        alert('Error uploading and converting the image, please try again')
        console.error('Error uploading and converting the image', error)
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        model.imageOriginView = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    model.imageOrigin = file;
    model.histogram = null;
    model.resultImage = null;
  }
};

const applyThreshold = async () => {
  const url = 'http://localhost:5000/api/v1.0/threshold';

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