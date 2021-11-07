import { getNameString, dateFormate } from "../util/index"

const button = document.createElement("button")
button.innerHTML = "点击我加载element"

button.addEventListener("click",function (){
  // preLoad 预加载 在加载父模块时同时加载
  // prefech 浏览器闲置时提前下载文件
  // 使用魔法注释来定义element组件打包后多文件名称
  import(
    /* webpackChunkName: element */
    /* webpackPrefetch: true */
    /* webpackPreLoad: true */
    "./element").then(res => {
    const element = res.default //获得element对象
    document.appendChild(element) //将element对象添加到dom中去
  })
})

getNameString();
dateFormate();