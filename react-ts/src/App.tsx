import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import StageContainer from "./components/ stageContainer";
import "./App.scss";

function App() {
  return (<React.Fragment>
    <Header>
      <MyHeader />
    </Header>
    <Content>
      <StageContainer title="base" description="React Hooks">
        <div>
          1312
        </div>
      </StageContainer>
    </Content>
    <Footer>
      <MyFooter />
    </Footer>
  </React.Fragment>);
}

export default App;
