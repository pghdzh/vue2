<template>
  <div class="spec-preview">
    <img :src="images.imgUrl" />
    <div class="event" @mousemove="changeMove"></div>
    <div class="big">
      <img :src="images.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["imageList"],
  mounted() {
    this.$bus.$on("send", (index) => {
      this.currentIndex = index;
    });
  },
  computed: {
    images() {
      return this.imageList[this.currentIndex] || {};
    },
  },
  methods: {
    changeMove(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let l = event.offsetX - mask.offsetWidth / 2;
      let t = event.offsetY - mask.offsetHeight / 2;
      
      if (l <= 0) l = 0;
      if (l >= mask.offsetWidth) l = mask.offsetWidth;
      if (t <= 0) t = 0;
      if (t >= mask.offsetHeight) t = mask.offsetHeight;

      mask.style.left = l + "px";
      mask.style.top = t + "px";
      big.style.left = -2 * l + "px";
      big.style.top = -2 * t + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>