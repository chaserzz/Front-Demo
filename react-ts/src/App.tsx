import { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useEffect, useState }from "react";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import StageContainer from "./components/ stageContainer";

import Base from "./pages/base";
import MyuseEffect from "./pages/base/c-pages/useEffect"

import { Button } from "antd";
import "./App.scss";
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
function App() {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {

  },[])
  
  // 隐藏展示demo的div
  function hiddenComponentDemo(){
    setShowComponent(false);
  }
  // render
  return (<React.Fragment>
    <Header>
      <MyHeader />
    </Header>
    <Content>
      <StageContainer title="base" description="React Hooks">
        <Base setShowComponent={setShowComponent} />
      </StageContainer>
    </Content>
    <Footer>
      <MyFooter />
    </Footer>
    <div className={`content ${showComponent ? "show" : "hidden"} `} >
      <Button onClick={hiddenComponentDemo}>Quit</Button>
      <MyuseEffect />
    </div>
  </React.Fragment>);
}

export default App;
