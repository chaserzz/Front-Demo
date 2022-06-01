import React, { memo, useContext, useEffect, useLayoutEffect, useRef, useState, } from 'react'
import FlipContext from './flipContext'
import { calculateInvert } from './utils';
const FlipChild = memo(({children,name}) => {
  const {
    mapNameToRect,
    setMapNameToRect
  } = useContext(FlipContext);
  const [visible, setVisible] = useState(false);
  const curDom = useRef(null);
  // 使用useEffect获取挂载时的dom数据
  useEffect(() => {
    
  },[]);
  // 使用layout获取离开前的dom数据
  useLayoutEffect(() => {
    const curRect = curDom.current.getBoundingClientRect();
    if(mapNameToRect[name]){
      const preRect = mapNameToRect[name];
      const {left,top,scalX,scalY} = calculateInvert(preRect,curRect);
      const player = curDom.current.animate([
        {transform: `translate(${left}px,${top}px) scale(${scalX},${scalY})`},
        {transform: 'none'}
      ],{
        duration: 3000,
        easing: "cubic-bezier(0,0,0.32,1)",
      });
      setVisible(true);
    }else{
      setVisible(true);
    }
    setMapNameToRect(curRect,name);
  }, []);
  return (
    <div ref={curDom} style={{width: 'fit-content', height: 'fit-content'}}>
      {children}
    </div>
  )
})

export default FlipChild