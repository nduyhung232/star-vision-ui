<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="w-full flex justify-center mb-5">
      <img src="logo.png" width="150" height="150" />
    </div>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li @click="toggleSubmenu('threshold')" class="menu-item">
        <span>Threshold</span>
        <span class="arrow" :class="{ open: isSubmenuOpen.training }">&#10095;</span>
        <ul v-if="isSubmenuOpen.threshold" class="submenu">
          <li><router-link to="/training/basics">Otsu</router-link></li>
        </ul>
      </li>
      <li @click="toggleSubmenu('training')" class="menu-item">
        <span>Training</span>
        <span class="arrow" :class="{ open: isSubmenuOpen.training }">&#10095;</span>
        <ul v-if="isSubmenuOpen.training" class="submenu">
          <li><router-link to="/training/basics">Basics</router-link></li>
          <li><router-link to="/training/advanced">Advanced</router-link></li>
        </ul>
      </li>
      <li @click="toggleSubmenu('predict')" class="menu-item">
        <span>Predict</span>
        <span class="arrow" :class="{ open: isSubmenuOpen.predict }">&#10095;</span>
        <ul v-if="isSubmenuOpen.predict" class="submenu">
          <li><router-link to="/predict/classification">Classification</router-link></li>
          <li><router-link to="/predict/regression">Regression</router-link></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isSubmenuOpen: {
        threshold: false,
        training: false,
        predict: false
      }
    };
  },
  methods: {
    toggleSubmenu(menu) {
      this.isSubmenuOpen = {
        training: false,
        predict: false,
        [menu]: !this.isSubmenuOpen[menu]
      };
    }
  }
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 250px;
  position: fixed;
  top: 0;
  left: -250px;
  background-color: #222831;
  padding-top: 20px;
  transition: left 0.3s;
}

.sidebar.open {
  left: 0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 12px 16px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.sidebar ul li {
  color: white;
  text-decoration: none;
  display: block;
}

.sidebar ul li a:hover {
  color: #76ABAE;
}

/* Mũi tên */
.menu-item .arrow {
  position: absolute;
  right: 20px;
  transition: transform 0.3s;
}

.menu-item .arrow.open {
  transform: rotate(90deg); /* Xoay mũi tên sang phải khi mở submenu */
}

.submenu {
  list-style-type: none;
  padding: 0;
  margin-left: 15px;
}

.submenu li {
  padding: 8px 16px;
  font-size: 14px;
}
</style>
