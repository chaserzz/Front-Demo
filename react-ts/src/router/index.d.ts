import React from "react";

//声明路由的类型
declare type RouterType = {
    root: string[] //?
    component: React.LazyExoticComponent<any>,  //匹配的react组件
    path: string,  //路径
    notExect?: boolean,  //是否精确匹配
    routes?: RouterType[]
}
