<template>
  <div class="image-box">
    <div class="image-title text-white text-lg">
      <span>{{ title }}</span>
    </div>
    <div class="image">
      <div ref="panzoomElement">
        <img :style="imageStyle" :width="imageWidth" :height="imageHeight" :src="source" :alt="alt" ref="panzoomTarget">
      </div>
    </div>
  </div>
</template>

<script>
import panzoom from 'panzoom';

export default {
  name: "ImageComp",
  data() {
    return {
      scale: 1, // Initial scale factor
      imageWidth: 500, // Default image width
      imageHeight: 500, // Default image height
      minWidth: 400,
      maxWidth: 500,
    };
  },
  mounted() {
    // Initialize Panzoom when the component is mounted
    this.initPanzoom();
    this.calculateCanvasSize();
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    source: {}
  },
  computed: {
    imageStyle() {
      return {
        transform: `scale(${this.scale})`,
      };
    },
  },
  methods: {
    calculateCanvasSize() {
      const image = new Image();
      image.src = this.source;

      // Calculate the canvas dimensions based on the image's aspect ratio
      image.onload = () => {
        const aspectRatio = image.width / image.height;

        // Set canvas width within the specified range
        this.imageWidth = Math.min(Math.max(image.width, this.minWidth), this.maxWidth);

        // Calculate and set image height to maintain the image's aspect ratio
        this.imageHeight = Math.round(this.imageWidth / aspectRatio);
      };
    },
    initPanzoom() {
      // Get the panzoom container and target elements using refs
      const container = this.$refs.panzoomElement;
      const target = this.$refs.panzoomTarget;

      // Initialize Panzoom
      const pz = panzoom(target, {
        // You can customize options here
        maxZoom: 10,
        minZoom: 1,
      });

      // Optional: Add event listeners for additional functionality
      container.addEventListener('wheel', pz.zoomWithWheel);
    },
  },
};
</script>

<style scoped>
.image-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  margin-bottom: 100px;
}

.image {
  border: 1px solid lightgreen;
  border-radius: 4px;
  overflow: hidden;
}

.image img {
  transition: transform 0.3s ease;
}
</style>
  

