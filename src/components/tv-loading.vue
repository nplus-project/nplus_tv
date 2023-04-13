<template>
  <div class="mask">
    <div class="box">
      <img src="@/assets/loading.png" class="load-icon">
      <div class="load-text">Loading...</div>
    </div>
  </div>
</template>

<style lang="scss">
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.load {
  &-icon {
    width: 140px;
    height: 140px;
    animation: rotate 2s linear infinite;
  }
  &-text {
    width: 100%;
    margin-top: 32px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 51px;
    color: #ffffff;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.box {
  display: flex;
  justify-content: center;
  position: absolute;
  flex-wrap: wrap;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 197px;
  height: 223px;
}
</style>
