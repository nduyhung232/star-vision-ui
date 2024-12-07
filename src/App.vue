<template>
  <div id="app">
    <SidebarMenu :isOpen="isSidebarOpen" @close="toggleSidebar" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarMenu from './components/SidebarMenu.vue';

export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  data() {
    return {
      isSidebarOpen: true
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style>
#app {
  display: flex;
  background: #31363F;
  width: 100vw;
  height: 100vh;
}

.content {
  margin-left: 250px; /* Same width as the sidebar */
  width: 100%;
}

.sidebar.open + .content {
  margin-left: 250px;
}

.sidebar + .content {
  margin-left: 0;
}

/* Thanh cuộn thanh lịch */
::-webkit-scrollbar {
  width: 8px; /* Độ rộng của scrollbar */
}

::-webkit-scrollbar-track {
  background: #31363f; /* Màu nền track */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #222831; /* Màu thanh cuộn */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #262626; /* Màu khi hover */
}
</style>
