import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchUser } from './actions/user.action'

// 服务端数据加载
function loadData (store) {
  return store.dispatch(fetchUser())
}

function List (props) {
  const {user,dispatch} = props
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  return (
    <div>
      list is working
      <ul>
        {
          user.map(item => (
            <li key={item.id}>
              { item.name }
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

// 返回路由信息
export default {
  component: connect(mapStateToProps)(List),
  loadData
}