import React, { memo } from 'react'
import type { IProjectConfig } from "./type";

import "./index.scss";

import { Divider } from 'antd';

export default memo(function MyFooter() {
  //项目配置
  const projectConfig: IProjectConfig = {
    React: "17.0.2",
    TypeScript: "4.3.5",
    Sass: "1.37.5",
    AntDesgin: "4.16.11",
  }
  return (<div id="div-footer">
    <ul>
    {Object.keys(projectConfig).map((item,index,arr) => {
      return (<li key={item}>
        <span>{item}</span>: <span>{projectConfig[item]}</span>
        {index !== (arr.length - 1) && <Divider type="vertical" />}
      </li>)
    })}
    </ul>
  </div>)
})
