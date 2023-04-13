import VueRouter from "vue-router";
//引入组件
import Home from "@/views/Home/index.vue";
import Profile from "@/views/Profile/index.vue";
import Super from "@/views/Super/index.vue";

//创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/profile",
      name: 'profilePage',
      component: Profile,
    },
    {
      path: "/super",
      name: 'superPage',
      component: Super,
    },
  ],
});
