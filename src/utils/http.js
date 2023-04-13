import { baseUrl } from "../../config";
import axios from "axios";
const server = axios.create({
  baseURL: baseUrl, //配置请求的url
  timeout: 6000, //配置超时时间
  headers: {
    "content-type": "application/json",
    "session-token": "",
  }, //配置请求头
});
// interceptors为axios的拦截器 如果我们想要在请求以前做些什么 这个时候就需要用到拦截器  视业务需求而定
server.interceptors.request.use(
  function (config) {
    //非登录的请求都加上一个请求头
    console.log("请求拦截器已经执行");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { status, data } = response;
    if (status === 200) {
      return data;
    }
  }
  // function (error) {
  // 对响应错误做点什么
  // return Promise.reject(error);
  // }
);
export default server;
