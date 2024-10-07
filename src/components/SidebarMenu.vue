<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="w-full flex justify-center mb-5">
      <img src="logo.png" width="150" height="150" />
    </div>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/training">Training</router-link>
      </li>
      <li>
        <router-link to="/predict">Predict</router-link>
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

.sidebar .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 12px 16px;
  font-size: 15px;
  text-align: center;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  display: block;
}

.sidebar ul li a:hover {
  color: #76ABAE;
}
</style>
