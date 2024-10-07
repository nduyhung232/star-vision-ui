<template>
  <div class="result">
    <div class="image-box">
      <div class="text-white text-lg">
        <span>{{ title }}</span>
      </div>
      <div class="image">
        <div ref="panzoomElement">
          <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
        </div>
      </div>
    </div>
    <div class="roi-manager">
      <div class="text-center text-lg border-b-2 border-green-400">
        Points
      </div>
      <div class="roi-points">
        <div v-for="(item, index) in this.points" :key="index" class="point"
             :class="this.pointClicked[index] && 'bg-green'"
             @click="handleClickPoint(index)">
          <span>{{ item[0] }}</span> - <span>{{ item[1] }}</span>
        </div>
      </div>
      <div class="roi-extension">
        <div class="text-lg">
          <div class="flex">
            <span class="basis-28">Select All</span>
            <input type="checkbox" v-model="labelAll" :disabled="distanceMap" @click="handleAllPoints">
          </div>
          <div class="flex">
            <span class="basis-28">Distance Map</span>
            <input type="checkbox" v-model="distanceMap" :disabled="labelAll" @click="handleShowDistanceMap">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import panzoom from 'panzoom';

export default {
  name: "ImageRes",
  data() {
    return {
      scale: 1, // Initial scale factor
      canvasWidth: 500, // Default canvas width
      canvasHeight: 500, // Default canvas height
      minWidth: 400,
      maxWidth: 500,
      pointClicked: [],
      prevPoint: -1,
      curPoint: -1,
      scaleX: 1,
      scaleY: 1,
      labelAll: false,
      distanceMap: false
    };
  },
  watch: {
    source() {
      this.drawImageOnCanvas();
    }
  },
  mounted() {
    // Initialize Panzoom when the component is mounted
    this.initPanzoom();

    // init image to canvas object
    this.calculateCanvasSize();
    this.drawImageOnCanvas();
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
    source: {},
    coordArray: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    points: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    strokeLine: {
      type: String,
      default: '#000000'
    }
  },
  methods: {
    drawBoundary(context, coord) {
      context.beginPath();
      context.strokeStyle = this.strokeLine;
      context.lineWidth = 2;
      context.moveTo(coord[1][0] * this.scaleX, coord[0][0] * this.scaleY);

      for (let i = 1; i < coord[0].length; i++) {
        context.lineTo(coord[1][i] * this.scaleX, coord[0][i] * this.scaleY);
      }
      context.closePath();
      context.stroke();
    },
    drawDistaceMap(context, points, coord) {
      context.lineWidth = 0.5;
      context.strokeStyle = "black";
      for (let i = 0; i < points.length; i++) {
        // draw the boundary points
        for (let j = 0; j < coord[0][0].length; j++) {
          context.beginPath();
          context.moveTo(points[i][1] * this.scaleX, points[i][0] * this.scaleY);
          context.lineTo(coord[i][1][j] * this.scaleX, coord[i][0][j] * this.scaleY);
          context.stroke();
        }
        context.strokeStyle = 'black';
        context.lineWidth = 0.5;
        context.stroke();
      }
    },
    handleShowDistanceMap() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      if (this.distanceMap == false) {
        this.drawDistaceMap(context, this.points, this.coordArray);
      } else {
        this.drawImageOnCanvas();
      }
    },
    handleAllPoints() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      if (this.labelAll == false) {
        for (let i = 0; i < this.coordArray.length; i++) {
          this.drawBoundary(context, this.coordArray[i]);
          this.pointClicked[i] = 1;
        }
      } else {
        this.drawImageOnCanvas();
        this.pointClicked = [];
      }
    },
    handleClickPoint(index) {
      if (this.pointClicked[index]) {
        return
      }
      if (this.curPoint != -1) {
        this.prevPoint = this.curPoint;
      }
      this.pointClicked = [];
      this.pointClicked[index] = 1;
      this.curPoint = index;

      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = this.source;
      // Clear the pre boundary
      if (this.prevPoint != -1) {
        context.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);
      }
      // Draw new boundary
      this.drawBoundary(context, this.coordArray[this.curPoint]);
    },
    calculateCanvasSize() {
      const image = new Image();
      image.src = this.source;

      // Calculate the canvas dimensions based on the image's aspect ratio
      image.onload = () => {
        const aspectRatio = image.width / image.height;

        // Set canvas width within the specified range
        this.canvasWidth = Math.min(Math.max(image.width, this.minWidth), this.maxWidth);

        // Calculate and set canvas height to maintain the image's aspect ratio
        this.canvasHeight = Math.round(this.canvasWidth / aspectRatio);

        this.scaleX = this.canvasWidth / image.width;
        this.scaleY = this.canvasHeight / image.height;
      };
    },
    drawImageOnCanvas() {
      return new Promise(() => {
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');

        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);
          // You can add additional drawing logic here if needed
        };

        image.src = this.source;
      })
    },
    initPanzoom() {
      // Get the panzoom container and target elements using refs
      const container = this.$refs.panzoomElement;
      const target = this.$refs.canvas;

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
.result {
  display: flex;
  column-gap: 100px;
  align-items: center;
}

@media only screen and (max-width: 900px) {
  .result {
    flex-direction: column;
  }
}

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
  min-width: 400px;
  min-height: 400px;
  max-width: 500px;
  max-height: 500px;
  transition: transform 0.3s ease;
}

.roi-manager {
  color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid lightgreen;
  width: 150px;
  /* margin-top: -100px; */
  margin-bottom: 100px;
}

.roi-points {
  color: #fff;
  max-height: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.roi-extension {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.point {
  display: flex;
  height: 50px;
  font-size: 20px;
  justify-content: center;
  border-bottom: 1px solid lightgreen;
  cursor: pointer;
}

.bg-green {
  background-color: lightgreen;
  color: #000;
}
</style>
  

