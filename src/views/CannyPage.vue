<template>
  <div class="h-screen overflow-y-auto bg-gray-100 p-4">
    <HeaderComp :title="'Canny Page'"/>
    <div class="flex items-center p-4">
      <input type="file" @change="uploadImage" accept="image/*"/>
      <CommonButton
          @click="applyCanny()"
          name="Apply Canny"
          :custom-classes="'py-4'"
      >
      </CommonButton>
    </div>
    <div class="flex flex-col">
      <div class="h-10">
        <span class="text-white mr-4">Objects Counted:</span>
        <span class="text-lime-400">{{ model.objectsCount }}</span>
      </div>
      <div class="flex">
        <div class="mx-1 flex-1">
          <ImageComp v-if="model.imageOriginView" title="Original Image" :source="model.imageOriginView"
                     alt="Uploaded Image"/>
        </div>
        <div class="mx-1 flex-1">
          <ImageComp v-if="model.hogImage" title="Canny Image" :source="model.hogImage"
                     alt="Uploaded Image"/>
        </div>
        <div class="mx-1 flex-1">
          <ImageComp v-if="model.segmentedImage" title="Segmented Image" :source="model.segmentedImage"
                     alt="Uploaded Image"/>
        </div>
      </div>
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
  edgedImage: null,
  segmentedImage: null,
  objectsCount: 0
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

const applyCanny = async () => {
  const url = 'http://localhost:5000/api/v1.0/canny';

  if (!model.imageOrigin) {
    alert("You need to choose the image first")
    return
  }

  const formData = new FormData();
  formData.append('image', model.imageOrigin);

  try {
    const response = await axios.post(url, formData, {});
    model.hogImage = 'http://localhost:5000' + response.data.edged_image_url
    model.segmentedImage = 'http://localhost:5000' + response.data.segmented_image_url
    model.objectsCount = response.data.total_bounding_boxes
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  }
}

</script>

<style>

</style>