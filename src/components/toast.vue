<template>
  <div class="toast" v-show="isShow">
    <div
      class="toast-box"
      :class="[
        { 'toast-fail': type === 'fail' },
        { 'toast-warn': type === 'warn' },
      ]"
    >
      <img
        :src="
          type === 'success'
            ? require('@/assets/toast-success.png')
            : type === 'fail'
            ? require('@/assets/toast-fail.png')
            : require('@/assets/toast-warn.png')
        "
        class="toast-icon"
      />
      <text class="toast-text">{{ title }}</text>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      type: "",
      title: "",
    };
  },
  name: 'toastPage',
  methods: {
    show(title, type) {
      this.title = title;
      this.type = type;
      this.isShow = true;
      let timer = setTimeout(() => {
        this.isShow = false;
        clearInterval(timer);
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
.toast {
  z-index: 30;
  width: 100%;
  position: fixed;
  top: 23.9px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  &-fail {
    background: #ed7373 !important;
  }

  &-warn {
    background: #6a66ff !important;
  }

  &-box {
    width: fit-content;
    box-sizing: border-box;
    padding: 8px 12px;
    height: 36px;
    background: #259479;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  &-text {
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
  }
}
</style>
