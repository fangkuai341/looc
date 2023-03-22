import axios from "axios";
const Service = axios.create({
  timeout: 50000,
  baseURL: "/",
  withCredentials: true,
});
//响应拦截器
Service.interceptors.response.use(
  (respone) => {
    return respone;
  },
  (error) => {
    return error;
  }
);
class request {
  static get(url, params) {
    let config = {
      method: "get",
      data: params,
      url: url,
    };
    return Service(url, config);
  }
  static post(url, params) {
    let config = {
      method: "post",
      data: params,
      url: url,

    };
    return Service(url, config);
  }
}
export default request;
