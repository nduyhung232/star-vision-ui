<template>
  <HeaderComp :title="'Training Page'"/>
  <div class="flex justify-end items-center p-4">
    <CommonButton
        @click="openPopup"
        name="Add New Model"
        :custom-classes="'py-4'"
    >
    </CommonButton>
    <PopupComponent :isOpen="isPopupOpen" @close="closePopup"/>
  </div>
  <CommonTable :columns="columns" :data="models" @button-click="deleteModel"/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import CommonTable from '@/components/CommonTable.vue';
import HeaderComp from "@/components/HeaderComp.vue";
import PopupComponent from '@/components/CreateModelPopupComp.vue';
import axios from "axios";
import CommonButton from "@/components/CommonButton.vue";

const isPopupOpen = ref(false);

const columns = ref([
  {key: 'model_name', label: 'Model Name'},
  {key: 'creation_time', label: 'Creation Time'},
  {key: 'action', label: 'Action', type: 'button', buttonText: 'Delete'}
]);

const models = ref();

onMounted(() => {
  getModeList()
});

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
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  }
}

const deleteModel = async ({row}) => {
  const url = 'http://localhost:5000/api/v1.0/model';

  try {
    await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        modelName: row.model_name.trim()
      }
    });
    alert('Successfully deleted model');
    getModeList();
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  }
};

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};
</script>

<style>

</style>