<template>
  <div class="super">
    <video
      ref="myVideo"
      v-show="videoShow"
      class="super-video"
      :src="url"
      autoplay
      muted
      @timeupdate="handleTimeUpdate"
    ></video>
    <div class="bullet" v-show="!videoShow">
      <img :src="avatar" class="bullet-image" />
      <div class="bullet-text">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
import { productDetail } from "@/api/tv.js";
export default {
  data() {
    return {
      url: "",
      avatar: "",
      content: "",
      videoShow: true,
      isEnter: false,
      id: 0,
      pauseTime: "",
      duration: "",
    };
  },
  mounted: async function () {
    if (this.$route.query) {
      let query = this.$route.query;
      this.content = JSON.parse(decodeURIComponent(query.content));
      this.id = JSON.parse(decodeURIComponent(query.id));
      let res = await productDetail({
        id: this.id,
      });
      this.avatar = JSON.parse(decodeURIComponent(query.image));
      this.url = res.video;
      this.$refs.myVideo.play();
      this.pauseTime = res.video_stop_time;
      this.duration = res.total_video_duration;
    }
    const isFullscreen = localStorage.getItem("isFullscreen");
    if (isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  },
  name: "superPage",
  methods: {
    handleTimeUpdate(e) {
      const that = this;
      if (e.target.currentTime >= this.pauseTime) {
        if (e.target.currentTime >= this.duration) {
          this.$router.push({
            path: "/",
            query: {
              id: 3,
            },
          });
        }
        if (!this.isEnter) {
          this.isEnter = true;
          this.videoShow = false;
          this.$refs.myVideo.pause();
          setTimeout(() => {
            that.videoShow = true;
            that.$refs.myVideo.play();
          }, 8000);
        }
      } else {
        this.isEnter = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
