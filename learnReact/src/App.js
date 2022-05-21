import { Provider } from "react-redux";
import { HashRouter, NavLink } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import route from "./router"
import store from "./store"

import { Layout, Menu } from "antd"

function App() {
  let { Header, Content } = Layout
  return (
    <Provider store={store}>
      <HashRouter >
      <Layout className="layout">
        <Header>
          <Menu theme="light" mode="horizontal"  defaultSelectedKeys={['toDoList']}>
            <Menu.Item key="toDoList"><NavLink to="/toDoList">ToDoList</NavLink></Menu.Item>
            <Menu.Item key="redux"><NavLink to="/redux">ReduxDemo_Connet</NavLink></Menu.Item>
            <Menu.Item key="reduxThunkDemo"><NavLink to="/reduxThunkDemo">ReduxThunk_Demo</NavLink></Menu.Item>
            <Menu.Item key="reduxSaga"><NavLink to="/reduxSaga">ReduxSaga_Demo</NavLink></Menu.Item>
            <Menu.Item key="drag"><NavLink to="/drag">Drug_Demo</NavLink></Menu.Item>
            <Menu.Item key="Hook"><NavLink to="/hook">Hook_Demo</NavLink></Menu.Item>
            <Menu.Item key="teletPort1"><NavLink to='/teleport1'>Teleport1</NavLink></Menu.Item>
            <Menu.Item key="teletPort2"><NavLink to='/teleport2'>Teleport2</NavLink></Menu.Item>
          </Menu>
        </Header>
        <Content>
          {renderRoutes(route)}
        </Content>
      </Layout>
    </HashRouter> 
    </Provider>
  )
}

export default App;
