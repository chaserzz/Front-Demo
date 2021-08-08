import { NavLink } from "react-router-dom"
import { Fragment, memo } from "react"
import { renderRoutes } from 'react-router-config'

import { Layout, Menu } from "antd"

function Hook(props) {
  let { Header, Content } = Layout
  const route = props.route
  let baseUrl = "/hook" // 路由基本地址
  const MenuItems = ["useEffect","useContext","useReducer","useCallback","useRef","useImp"]  //渲染的具体路由地址以及对应的展示名称
  return (
    <Fragment>
      <Layout className="layout">
        <Header>
          <Menu theme="light" mode="horizontal" >
            {MenuItems.map(item => {
              return (
                <Menu.Item key={item}>
                  <NavLink to={`${baseUrl}/${item}`} >{item}</NavLink>
                </Menu.Item>
              )
            })}
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
