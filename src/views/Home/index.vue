<template>
  <div class="login" @click="fullScreenClick">
    <!-- 	<div class="login-text">
			NPLUS
		</div> -->
    <video
      v-show="mp4Show"
      class="login-video"
      id="video"
      :src="require('@/assets/video/1.mp4')"
      autoplay
      muted
      controls
      loop
    ></video>
    <img :src="bg" class="login-bg" v-show="!mp4Show" />
    <div class="login-box">
      <div class="code-text">发弹幕</div>
      <div class="login-code">
        <vue-qr :size="size" :text="codeValue"> </vue-qr>
      </div>
    </div>

    <div class="detail_img">
      <div class="bottom"></div>
      <div
        class="dmGroup"
        v-for="(item, index) in dmData"
        :key="index"
        v-bind:style="{
          top: item.top + '%',
          animationDuration: item.time + 's',
          animationTimingFunction: 'linear',
          animationDelay: 10 + 'ms',
          display: index == 0 ? 'none' : 'inherit',
        }"
      >
        <div class="dmItem">
          <div class="dm">
            <div class="avatarBox">
              <img :src="item.avatar" class="avatar" mode="aspectFit" />
            </div>
            <p class="content">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <tv-loading v-show="loadingShow"></tv-loading>
  </div>
</template>

<script>
import {
  fetchCode,
  fetchCodeStatus,
  bulletList,
  // screenDeatil,
} from "@/api/tv.js";
import tvLoading from "@/components/tv-loading.vue";
import vueQr from "vue-qr";
export default {
  data() {
    return {
      size: 1,
      codeValue: "1",
      loadingShow: true,
      status: "init",
      codeId: "",
      timer: null,
      timerTwo: null,
      fullScreen: false,
      mp4Show: true,
      bg: require("@/assets/bg.gif"),
      dmData: [],
      list: [],
      total: 1,
      page: 1,
      screenId: 0,
    };
  },
  name: "homePage",
  components: {
    tvLoading,
    vueQr,
  },
  mounted: async function () {
    this.timerTwo = setInterval(async () => {
      this.setDM();
    }, 1000);

    this.fetchInfo();
    await this.handleCodeCotent();
    await this.handleCodeStatus();
    this.size = (document.documentElement.clientWidth / 100) * 8;
    window.onresize = function () {
      this.size = (document.documentElement.clientWidth / 100) * 8;
    };
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      this.handleFullscreenChange
    );
    document.addEventListener(
      "mozfullscreenchange",
      this.handleFullscreenChange
    );
    document.addEventListener(
      "MSFullscreenChange",
      this.handleFullscreenChange
    );
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.timerTwo) {
      clearInterval(this.timerTwo);
      this.timerTwo = null;
    }
  },
  beforeRouteLeave(to, from, next) {
    // 保存全屏状态
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    localStorage.setItem("isFullscreen", isFullscreen);
    next();
  },
  methods: {
    handleFullscreenChange() {
      // 记录全屏状态
      const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      localStorage.setItem("isFullscreen", isFullscreen);
    },
    async handleBulletList() {
      let that = this;
      let res = await bulletList({
        paginate: {
          page: that.page,
          page_size: 1,
        },
        screen_id: this.screenId,
      });
      if (res.page_info.total !== that.total) {
        that.page = res.page_info.total + 1;
        that.total = res.page_info.total;
        res.data.map((item) => {
          if (item.product !== null) {
            this.$router.push({
              path: "/super",
              query: {
                content: encodeURIComponent(JSON.stringify(item.content)),
                id: encodeURIComponent(JSON.stringify(item.product.id)),
              },
            });
          }
          that.list.push({
            avatar: item.user.avatar_url,
            desc: item.content,
            top: Math.floor(Math.random() * 70) + 2,
            product: item.product,
          });
        });
        const dmArr = [];
        const _b = that.list;
        for (let i = 0; i < _b.length; i++) {
          const time = Math.floor(Math.random() * 10);
          const _time = time < 16 ? 16 + i : time + i;

          const _p = {
            desc: _b[i].desc,
            avatar: _b[i].avatar,
            product: _b[i].product,
            top: _b[i].top,
            time: _time,
          };
          dmArr.push(_p);
        }
        that.dmData = dmArr;
      }
    },
    async setDM() {
      await this.handleBulletList();
    },
    async fetchInfo() {
      this.screenId = this.$route.query.id;
      // let res = await screenDeatil({
      //   id: this.screenId,
      // });
      // this.mp4Url = res.video;
    },
    async handleCodeCotent() {
      this.loadingShow = true;
      let res = await fetchCode({
        url: "https://nplusbox.com/pages/tv/send/send?id=" + this.screenId,
      });
      this.codeId = res.code_id;
      this.codeValue = res.short_link;
      this.loadingShow = false;
    },
    handleCodeStatus() {
      this.timer = setInterval(async () => {
        let res = await fetchCodeStatus({
          code_id: this.codeId,
        });
        if (res?.status === "scanned") {
          this.loadingShow = true;
        } else if (res?.status === "confirmed") {
          this.$router.push({
            path: "/profile",
            query: {
              userId: res.user_id,
              screenId: this.screenId,
            },
          });
        }
      }, 1000);
    },
    fullScreenClick() {
      this.fullScreen = !this.fullScreen;
      if (this.fullScreen) {
        //当前要启动全屏
        //this.pageFullScreen();//执行全屏之后的一些操作
        this.screenFull();
      } else {
        //当前要退出全屏
        //this.pageExitFullScreen();//执行退出全屏之后的一些操作
        this.exitFull();
      }
    },
    screenFull() {
      let element = document.documentElement;
      // 判断浏览器是否支持全屏 API
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    exitFull() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
