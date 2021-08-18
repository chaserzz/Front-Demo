import { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useEffect, useState }from "react";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import StageContainer from "./components/ stageContainer";

import Base from "./pages/base";
import "./App.scss";

function App() {
  const [showComponent, setShowComponent] = useState("");
  useEffect(() => {

  },[])

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
    <div className={`content ${showComponent === "" ? "" : "show"} `} >

    </div>
  </React.Fragment>);
}

export default App;
