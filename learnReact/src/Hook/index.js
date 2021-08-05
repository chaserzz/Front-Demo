import { NavLink } from "react-router-dom"
import { Fragment, memo } from "react"
import { renderRoutes } from 'react-router-config'

import { Layout, Menu } from "antd"

function Hook(props) {
  let { Header, Content } = Layout
  const route = props.route
  return (
    <Fragment>
      <Layout className="layout">
        <Header>
          <Menu theme="light" mode="horizontal" >
            <Menu.Item key="useEffect"><NavLink to="/hook/useEffect">useEffect</NavLink></Menu.Item>
            <Menu.Item key="useContext"><NavLink to="/hook/useContext">useContext</NavLink></Menu.Item>
            <Menu.Item key="useReducer"><NavLink to="/hook/useReducer">useReducer</NavLink></Menu.Item>
            <Menu.Item key="useCallback"><NavLink to="/hook/useCallback">useCallback</NavLink></Menu.Item>
            <Menu.Item key="useMemo"><NavLink to="/hook/useMemo">useMemo</NavLink></Menu.Item>
            <Menu.Item key="useRef"><NavLink to="/hook/useRef">useRef</NavLink></Menu.Item>
            <Menu.Item key="useImp"><NavLink to="/hook/useImp">useImp</NavLink></Menu.Item>
          </Menu>
        </Header>
        <Content>
          {renderRoutes(route.routes)}
        </Content>
      </Layout>
    </Fragment> 
  )
}

export default memo(Hook);
