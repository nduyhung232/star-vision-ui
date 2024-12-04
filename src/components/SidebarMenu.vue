<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="w-full flex justify-center mb-5">
      <img src="logo.png" width="150" height="150" />
    </div>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li class="menu-item" :class="{ open: isSubmenuOpen.threshold }"
          @click="toggleSubmenu('threshold')">
        <span>Threshold</span>
        <span class="arrow" :class="{ open: isSubmenuOpen.threshold }">&#10095;</span>
        <ul v-if="isSubmenuOpen.threshold" class="submenu">
          <li><router-link to="/otsu">Otsu</router-link></li>
        </ul>
      </li>
      <li class="menu-item" :class="{ open: isSubmenuOpen.edge_segmentation }"
          @click="toggleSubmenu('edge_segmentation')">
        <span>Edge Segmentation</span>
        <span class="arrow" :class="{ open: isSubmenuOpen.edge_segmentation }">&#10095;</span>
        <ul v-if="isSubmenuOpen.edge_segmentation" class="submenu">
          <li><router-link to="/canny">Canny</router-link></li>
        </ul>
      </li>
      <li>
        <router-link to="/hog">Histogram of Oriented Gradients</router-link>
      </li>
      <li @click="toggleSubmenu('stardist')" class="menu-item">
        <span>Stardist Model</span>
        <span class="arrow" :class="{ open: isSubmenuOpen.stardist }">&#10095;</span>
        <ul v-if="isSubmenuOpen.stardist" class="submenu">
          <li><router-link to="/training">Training</router-link></li>
          <li><router-link to="/predict">Predict</router-link></li>
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
        edge_segmentation: false,
        hog: false,
        stardist: false
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
  background-color: #212529;
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
  padding: 12px 15px 12px 23px;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  position: relative;
}

.sidebar ul li {
  color: white;
  text-decoration: none;
  display: block;
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

.menu-item.open {
  background: #1a1e21;
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
