<template>
  <HeaderComp :title="'Predict Page'"/>
  <div class="flex flex-col">
    <span v-if="!model.image" class="caution">Please upload image with jpg, png or tif format and less than 10mb</span>
    <div class="flex">
      <div class="py-3 flex pr-10">
        <label class="text-white basis-48 pr-3" for="modelOption">Type Of Model:</label>
        <select id="modelOption" v-model="model.type">
          <option></option>
          <option v-for="item of models" :key="item.name">
            {{ item.model_name }}
          </option>
        </select>
      </div>
      <div class="py-3 flex">
        <label class="text-white basis-48 pr-3" for="colorMapOption">Color Map:</label>
        <select id="colorMapOption" v-model="model.colorMap">
          <option value="plasma">Plasma</option>
          <option value="jet">Jet</option>
          <option value="viridis">Viridis</option>
          <option value="random_label_cmap">Random Label</option>
        </select>
      </div>
    </div>
    <div v-if="!model.image" class="upload-box" @click="openFileSelector" :class="notAllowed && 'not-allowed'">
      <SpinnerLoading v-if="showSpinner"/>
      <input ref="fileInput" type="file" @change="uploadImage" accept="image/*" style="display: none;"
             :disabled="notAllowed">
      <div class="upload__message">
        <span>Click to upload file</span>
      </div>
    </div>
    <div class="flex mt-16">
      <ImageComp v-if="model.image" title="Original Image" :source="model.image" alt="Uploaded Image"/>
      <div class="flex flex-col justify-center mx-5">
        <CommonButton
            @click="handleSegmentation"
            name="Segment >>"
            :is-loading="showSpinner"
            v-if="model.image"
        >
          <SpinnerLoading v-if="showSpinner" size="small" colorProp="grey"/>
        </CommonButton>
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
    </div>
    <div class="flex h-8">
      <div class="mr-16 text-lime-400" v-if="model.image">
        <span class="text-white mr-4">Duration:</span>
        <span>{{ model.duration }} ms</span>
      </div>
      <div class="mr-16 text-lime-400" v-if="model.image">
        <span class="text-white mr-4">Objects Counted: </span>
        <span>{{ model.objectsCount }}</span>
      </div>
      <CommonButton
          @click="downloadImage"
          v-if="model.image"
          name="Download"
          :disabled="!isSegment"
          :custom-classes="'mr-16'"
      >
      </CommonButton>
    </div>
    <div class="w-full flex justify-end">
      <CommonButton
          @click="resetImage"
          name="Try New Image"
          v-if="model.image"
          :disabled="!isSegment"
          :custom-classes="'mr-16'"
      >
      </CommonButton>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import axios from 'axios'
import HeaderComp from '@/components/HeaderComp.vue'
import SpinnerLoading from '@/components/SpinnerLoading.vue'
import ImageComp from '@/components/ImageComp.vue'
import ImageRes from '@/components/ImageRes.vue'
import CommonButton from "@/components/CommonButton.vue";

const showSpinner = ref(false)
const notAllowed = ref(false)
const fileUpload = ref(null)
const models = ref();
const fileInput = ref(null)
const isSegment = ref(false)

const model = reactive({
  type: "",
  colorMap: "plasma",
  image: null,
  imageRes: null,
  duration: 0,
  objectsCount: 0,
  points: [],
  coord: [],
  strokeLine: '#000000',
})

onMounted(() => {
  getModeList()
});

const openFileSelector = () => {
  fileInput.value.click()
}

const uploadImage = async (event) => {
  showSpinner.value = true
  notAllowed.value = true
  const file = event.target.files[0]
  if (file) {
    fileUpload.value = file
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
        model.image = URL.createObjectURL(blob)
      } catch (error) {
        alert('Error uploading and converting the image, please try again')
        console.error('Error uploading and converting the image', error)
      }
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        model.image = reader.result
      }
    }
  }
  showSpinner.value = false
  notAllowed.value = false
}

const handleSegmentation = async () => {
  if (fileUpload.value != null && !notAllowed.value) {
    const formData = new FormData()
    formData.append('image', fileUpload.value)
    formData.append('modelName', model.type)
    formData.append('colorMap', model.colorMap)
    if (model.colorMap === 'random_label_cmap') {
      model.strokeLine = '#FF0000'
    } else {
      model.strokeLine = '#000000'
    }
    showSpinner.value = true
    notAllowed.value = true
    try {
      const startTime = performance.now()
      const response = await axios.post('http://localhost:5000/api/v1.0/segmentation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })

      model.imageRes = 'data:image/png;base64,' + response.data.imageBytes
      model.objectsCount = response.data.objectsCount
      model.points = response.data.points
      model.coord = response.data.coord
      model.duration = (performance.now() - startTime).toFixed(2)

      isSegment.value = true
    } catch (error) {
      alert('An error occur when segmenting the image, please try again!')
      console.error('Error uploading and converting the image', error)
    } finally {
      showSpinner.value = false
      notAllowed.value = false
    }
  }
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = model.imageRes
  link.download = 'mask.png'
  link.click()
}

const resetImage = () => {
  model.image = null
  model.imageRes = null
}

const getModeList = async () => {
  models.value = [];
  const url = 'http://localhost:5000/api/v1.0/models';

  const formData = new FormData();

  try {
    const response = await axios.get(url, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const modelList = response.data
    for (let i = 0; i < modelList.length; i++) {
      models.value.push({model_name: modelList[i], creation_time: '2024-06-17 15:03:15'})
    }
    // set default model selected
    if (models.value && models.value.length > 0) {
      model.type = models.value[0].model_name;
    }
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  }
}

</script>

<style scoped>

.upload-box {
  margin-top: 50px;
  width: 400px;
  height: 150px;
  color: #fff;
  border: 5px dashed lightgreen;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #282828;
  cursor: pointer;
}

.upload__message {
  font-size: 20px;
}

.tool span {
  color: lightgreen;
  text-decoration: underline;
  cursor: pointer;
}

.sample span {
  font-size: 20px;
  font-weight: 500;
  color: lightgreen;
  font-style: italic;
}

.caution {
  position: absolute;
  top: 450px;
  color: #fff;
  font-size: 16px;
}
</style>
