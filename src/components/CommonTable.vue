<template>
  <div class="common-table">
    <table>
      <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="column in columns" :key="column.key">
          <template v-if="column.type === 'button'">
            <button
                class="bg-red-500 text-white hover:bg-red-700 focus:ring-sky-300 hover:scale-105 text-sm px-3 py-1 rounded-full shadow-md focus:outline-none focus:ring-2 transition duration-300 ease-in-out transform"
                @click="() => handleButtonClick(row, column.key)">
              {{ column.buttonText }}
            </button>
          </template>
          <template v-else>
            {{ row[column.key] }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((column) => "key" in column && "label" in column);
    },
  },
  data: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['button-click']);

const handleButtonClick = (row, key) => {
  emit('button-click', {row, key});
};
</script>

<style scoped>
.common-table {
  margin: 1em 0;
}

.common-table table {
  width: 100%;
  border-collapse: collapse;
}

.common-table th,
.common-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.common-table td {
  color: #dddddd;
}

.common-table th {
  background-color: #f4f4f4;
}
</style>
