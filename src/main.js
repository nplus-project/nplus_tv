import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import VueRouter from "vue-router";
Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
