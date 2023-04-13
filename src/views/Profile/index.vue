<template>
  <div class="profile">
    <tv-loading v-show="loadingShow"></tv-loading>
    <div>
      <div class="profile-mask">
        <div class="profile-info">
          <img :src="avatarUrl" class="profile-avatar" />
          <div class="profile-welcome">欢迎</div>
          <div class="profile-name">
            {{ nickName }}
          </div>
          <div class="profile-alert" v-show="!animateShow">请绑定钱包地址</div>
        </div>
      </div>
      <img
        v-show="!animateShow"
        src="@/assets/bg-none.png"
        class="profile-none"
        mpde="widthfix"
      />
      <div class="profile-rotate" v-if="animateShow">
        <ul class="banner">
          <li class="banner-item" v-for="(item, index) in arr[0]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
          <li class="banner-item" v-for="(item, index) in arr[0]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
        </ul>
        <ul class="banner rev-list">
          <li class="banner-item" v-for="(item, index) in arr[1]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
          <li class="banner-item" v-for="(item, index) in arr[1]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
        </ul>
        <ul class="banner">
          <li class="banner-item" v-for="(item, index) in arr[2]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
          <li class="banner-item" v-for="(item, index) in arr[2]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
        </ul>
        <ul class="banner rev-list">
          <li class="banner-item" v-for="(item, index) in arr[3]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
          <li class="banner-item" v-for="(item, index) in arr[3]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
        </ul>
        <ul class="banner">
          <li class="banner-item" v-for="(item, index) in arr[4]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
          <li class="banner-item" v-for="(item, index) in arr[4]" :key="index">
            <img class="banner-image" :src="item.image" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllNft, getUserDetail } from "@/api/tv";
import tvLoading from "@/components/tv-loading.vue";
export default {
  data() {
    return {
      info: [],
      arr: [],
      userId: "",
      nickName: "",
      avatarUrl: "",
      timer: null,
      animateShow: true,
      loadingShow: true,
      screenId: "",
    };
  },
  name: "profilePage",
  components: {
    tvLoading,
  },
  mounted: async function () {
    this.userId = this.$route.query.userId;
    this.screenId = this.$route.query.screenId;
    this.loadingShow = true;
    await this.handleInfo();
    await this.handleNft();
    this.loadingShow = false;
    this.handelBack();

    // todo
    // this.swiperOption.slidesPerView =
    //   document.documentElement.clientWidth / 380;
    // window.onresize = function () {
    //   this.swiperOption.slidesPerView =
    //     document.documentElement.clientWidth / 380;
    // };
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    async handleNft() {
      let res = await getAllNft({
        paginate: {
          page: 1,
          page_size: 200,
        },
        user_id: this.userId,
      });
      this.info = res.data;
      let total = res.page_info.total;
      if (total >= 200) {
        total = 200;
      }
      if (total === 0) {
        this.animateShow = false;
        return;
      }
      this.animateShow = true;
      if (total > 0 && total < 50) {
        while (this.info.length < 50) {
          this.info = [...this.info, ...this.info];
        }
        this.arr = [
          this.info.slice(0, 10),
          this.info.slice(10, 20),
          this.info.slice(20, 30),
          this.info.slice(30, 40),
          this.info.slice(40, 50),
        ];
      } else {
        let a = Math.floor(total / 5);
        this.arr = [
          this.info.slice(0, a),
          this.info.slice(a, 2 * a),
          this.info.slice(2 * a, 3 * a),
          this.info.slice(3 * a, 4 * a),
          this.info.slice(4 * a, 5 * a),
        ];
      }
    },
    async handleInfo() {
      let res = await getUserDetail({
        id: this.userId,
      });
      this.nickName = res.nickname;
      this.avatarUrl = res.avatar_url;
    },
    handelBack() {
      let time;
      if (this.animateShow) {
        time = 25000;
      } else {
        time = 5000;
      }
      this.timer = setTimeout(() => {
        this.$router.push({
          path: "/",
          query: {
            id: this.screenId,
          },
        });
      }, time);
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
