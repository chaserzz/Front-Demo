import React, { memo, useContext, useLayoutEffect, useRef, useState, } from 'react'
import FlipContext from './flipContext'
const FlipChild = memo(({children,name}) => {
  const {
    mapNameToRect,
    setMapNameToRect
  } = useContext(FlipContext);
  const [visible, setVisible] = useState(false);
  const curDom = useRef(null)
  useLayoutEffect(() => {
    if(mapNameToRect[name]){
      const preRect = mapNameToRect[name];
      const curRect = document.getElementById(name).getBoundingClientRect()
      console.log('pre',preRect,curRect)
      setVisible(true)
    }else{
      setVisible(true)
    }
    return () => {
      const rect = curDom.current.getBoundingClientRect();
      setMapNameToRect(rect,name)
    }
  }, [])
  console.log('render',visible)
  return (
    <div id={name} style={visible ? {} : {display: 'none'}} ref={curDom}>
      {children}
    </div>
  )
})

export default FlipChild