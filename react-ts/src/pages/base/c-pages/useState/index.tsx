import React, { memo, useState } from 'react';
import type{ ICodeMirrorConfig } from "../common/type";
import "./index.scss";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Button } from 'antd';

export default memo(function MyUseState() {
  const [count, setCount] = useState(0);
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
      <p>{count}</p>
      <div className="div-oprate">
        <Button type="primary" onClick={handleIncreament}>+</Button>
        <Button type="primary" onClick={handleDecrement}>-</Button>
      </div>
    </div>
    <div>
    {/* <CodeMirror
      value={code}
      options={options}
      onBeforeChange={() => {}}/> */}
    </div>
  </div>)
})
