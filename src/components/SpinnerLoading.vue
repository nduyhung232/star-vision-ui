<template>
  <div class="spinner__content">
    <div id="loading-bar-spinner" class="spinner">
      <div class="spinner-icon" :class="size" :style="{borderColor : colorProp}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpinnerLoading",
  props: {
    show: { // Ẩn hoặc hiện spinner
      type: Boolean,
      default: false,
    },
    colorProp: {
      type: String,
      default: 'lightgreen'
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
};
</script>

<style scoped>
.spinner__content {
  position: absolute;
}

#loading-bar-spinner.spinner {
  left: 50%;
  margin-left: -20px;
  top: 50%;
  margin-top: -20px;
  position: absolute;
  z-index: 19 !important;
  -webkit-animation: loading-bar-spinner 700ms linear infinite;
  animation: loading-bar-spinner 700ms linear infinite;
  /* transform: translate(-50%, -50%); */
}

#loading-bar-spinner.spinner .normal {
  width: 40px;
  height: 40px;
  border: solid 4px transparent;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  -webkit-animation: colors 5s infinite;
  animation: colors 5s infinite;
}

#loading-bar-spinner.spinner .small {
  width: 30px;
  height: 30px;
  border: solid 4px transparent;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  -webkit-animation: colors 5s infinite;
  animation: colors 5s infinite;
}

@-webkit-keyframes loading-bar-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading-bar-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* @-webkit-keyframes colors {
  0%{
    border-color:lightgreen;
  }
  25%{
    border-color:lightgreen;
  }
  50%{
    border-color:lightgreen;
  }
  75%{
    border-color:lightgreen;
  }
  100%{
    border-color:lightgreen;
  }
}

@keyframes colors {
  0%{
    border-color:lightgreen;
  }
  25%{
    border-color:lightgreen;
  }
  50%{
    border-color:lightgreen;
  }
  75%{
    border-color:lightgreen;
  }
  100%{
    border-color:lightgreen;
  }
} */

</style>