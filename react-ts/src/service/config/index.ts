import axios, { AxiosInstance, AxiosRequestConfig} from "axios"
import getNetworkConfig from "./config"
import type { IAxiosConfig, IAxiosInterceptor } from "./type"

class AxiosRequest {
  instance: AxiosInstance  //axios实例对象
  interceptor: IAxiosInterceptor | undefined  //自定义axios拦截器对象　
  
  constructor(config: IAxiosConfig){
    this.instance = axios.create(config);  //根据config中的配置创建axios实例对象
    this.interceptor = config.interceptor;

    //对对应实例等request进行拦截
    this.instance.interceptors.request.use(
      this.interceptor?.requestSuccessInterceptor,
      this.interceptor?.requestErrorInterceptor
    );

    //对对应实例等response进行拦截
    this.instance.interceptors.response.use(
      this.interceptor?.responseSuccessInterceptor,
      this.interceptor?.responseErrorIntercetor
    )
  }

  request( config: AxiosRequestConfig): void{
    this.instance.request(config).then(res => {
      console.log(res);
    })
  }
}

export default AxiosRequest
export {
  getNetworkConfig
}