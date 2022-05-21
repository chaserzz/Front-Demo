import type { INetworkConfig, projectEnv } from "./type"
// 设置请求超时时间
const timeout = 6000;
const developmentConfig: INetworkConfig = {
  baseUrl: "localhost:2333",
  timeout
}
const productConfig: INetworkConfig = {
  baseUrl: "192.168.1.1",
  timeout
}

const testConfig: INetworkConfig = {
  baseUrl: "192.168.1.1",
  timeout 
}

const getNetworkConfig: (currentEnv: projectEnv) => INetworkConfig = (currentEnv) => {
  let config: any = null
  switch(currentEnv){
    case "development": {
      config =  developmentConfig;
      break;
    }
    case "production": {
      config = productConfig;
      break;
    }
    default: {
      config = testConfig;
      break;
    }
  }
  return config
}

export default getNetworkConfig