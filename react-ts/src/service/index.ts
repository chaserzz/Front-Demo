import AxiosRequest, { getNetworkConfig } from "./config";
import type{ INetworkConfig} from "./config/type";
const netWorkConfig:INetworkConfig = getNetworkConfig("development"); //项目基础配置

const axiosRequest = new AxiosRequest({
  baseURL: netWorkConfig.baseUrl,
  timeout: netWorkConfig.timeout,
  interceptor:{
    requestSuccessInterceptor: (config) => {
      console.log("请求成功");
      return config;
    },
    requestErrorInterceptor: (err) => {
      console.log("请求失败");
      return err;
    },
    responseSuccessInterceptor: (response) => {
      console.log("响应成功");
      return response;
    },
    responseErrorIntercetor: (err) => {
      console.log(err);
      return err;
    }
  }
});

export default axiosRequest