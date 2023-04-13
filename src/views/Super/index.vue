<template>
  <div class="super">
    <video
      ref="myVideo"
      v-show="videoShow"
      class="super-video"
      :src="url"
      autoplay
      muted
      controls
      @timeupdate="handleTimeUpdate"
    ></video>
    <div class="bullet" v-show="!videoShow">
      <image :src="avatar" class="bullet-image"></image>
      <div class="bullet-text">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
// import { productDetail } from "@/api/tv.js";
const dic = {
  6: {
    image: require("@/assets/bg/1.png"),
    is_published: true,
    name: "chucky1",
    price: "0.000000",
    total_video_duration: 9,
    video: require("@/assets/video/1.mp4"),
    video_stop_time: 4,
  },
  7: {
    image: require("@/assets/bg/2.png"),
    is_published: true,
    name: "chucky2",
    price: "0.000000",
    total_video_duration: 15,
    video: require("@/assets/video/2.mp4"),
    video_stop_time: 9,
  },
  8: {
    image: require("@/assets/bg/3.png"),
    is_published: true,
    name: "chucky3",
    price: "0.000000",
    total_video_duration: 15,
    video: require("@/assets/video/3.mp4"),
    video_stop_time: 10,
  },
  9: {
    image: require("@/assets/bg/4.png"),
    is_published: true,
    name: "chucky4",
    price: "0.000000",
    total_video_duration: 11,
    video: require("@/assets/video/4.mp4"),
    video_stop_time: 6,
  },
};
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
      let res = dic[this.id];
      // let res = await productDetail({
      //   id: this.id,
      // });
      this.avatar = res.image;
      this.url = res.video;
      this.$refs.myVideo.play();
      this.pauseTime = res.video_stop_time;
      this.duration = res.total_video_duration;
    }
  },
  name: "superPage",
  methods: {
    handleTimeUpdate(e) {
      const that = this;
      if (e.target.currentTime >= this.duration) {
        if (e.target.currentTime >= this.pauseTime) {
          this.$router.push({
            path: "/",
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
