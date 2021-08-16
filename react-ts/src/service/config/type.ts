import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 项目基本配置类型声明
// 环境
export type projectEnv = "development" | "production" | "test"
// axios中的基本配置
export interface INetworkConfig {
    baseUrl: string,  //项目服务器地址
    timeout: number   //超时时间
}
  

//Axios 类型声明
// 定义成功拦截请求时的返回值类型
type requestInterceptorReturn = AxiosRequestConfig | Promise<AxiosRequestConfig>

// 定义成功拦截响应时的返回值类型
type responseInterceptorReturn = AxiosResponse | Promise<AxiosResponse>

//定义一个axios的拦截器接口，其中存放request和response的成功和失败的拦截
export interface IAxiosInterceptor {
    requestSuccessInterceptor?: (requestConfig: AxiosRequestConfig) => requestInterceptorReturn,    //请求成功的拦截器
    requestErrorInterceptor?: (error: any) => any,      //请求失败的拦截器  
    responseSuccessInterceptor?: (response: AxiosResponse) => responseInterceptorReturn,  //响应成功的拦截器
    responseErrorIntercetor?: (error: any) => any    //响应失败的拦截器
}

// 将axios的请求配置类型和axios拦截器接口
export interface IAxiosConfig extends AxiosRequestConfig {
    interceptor?: IAxiosInterceptor
}