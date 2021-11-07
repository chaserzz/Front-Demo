import React, { memo, useEffect, useState } from 'react';
import type{ ICodeMirrorConfig } from "../common/type";
import "./index.scss";
import "../common/index.scss"
import { Controlled as CodeMirror } from "react-codemirror2";
import Children from './children/Children';

import { Button } from 'antd';
let className = ""
export default memo(function MyUseState() {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(false);
  const code = `export default memo(function MyUseState() {
    const [count, setCount] = useState(0);
    return (< className="div-container">
      <div>
  
      </div>)
    })`
  // codeMirror的配置
  const options: ICodeMirrorConfig = {
    mode: "javascript",
    readonly: true,
    lineNumbers: true,
    tabSize: 2,
    theme: "material"
  }
  useEffect(() => {
    className = count % 2 === 0 ? "odd" : "even"
  },[count])

  //计数器增加一
  function handleIncreament(){
    setCount(count + 1);
  }

  //计数器减一
  function handleDecrement(){
    setCount(count - 1);
  }

return (<div className="div-container">
    <div className="div-demo">
      <p className={className} >{count + "   我会随着奇偶变化"}</p>
      <div className="div-oprate">
        <Button type="primary" onClick={handleIncreament}>+</Button>
        <Button type="primary" onClick={handleDecrement}>-</Button>
      </div>
      <hr />
      <Button onClick={() => {setShowChild(!showChild)}}>ToggleChild</Button>
      {showChild && <Children />}
    </div>
    <div>
    {/* <CodeMirror
      value={code}
      options={options}
      onBeforeChange={() => {}}/> */}
    </div>
  </div>)
})
