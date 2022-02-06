import React from 'react'
import {Link} from 'react-router-dom'
const VDom = () => {
  // 该代码在未加入client的代码时并不会生效，在使用ssr的时候只会将其静态的html放置到文件中
  function handleOnClick(){
    console.log('div click');
  }
  return (
    <>
      <div onClick={() => handleOnClick()}>我是一个被渲染为真实DOM的虚拟DOM</div>
      <Link to="/list">to list</Link>
    </>
  )
}

export default VDom