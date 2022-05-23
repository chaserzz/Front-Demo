import React, { memo, useState } from 'react'
import FlipContext from './flipContext'
const FlipParent = memo((props) => {
  const [mapNameToRect, setMapNameToRect] = useState({});
  const contextValue = {
    mapNameToRect,
    setMapNameToRect: (value,name) => {
      setMapNameToRect(preState => Object.assign({},preState,{[name]: value}))
    }
  }
  return (
    <FlipContext.Provider value={contextValue}>
      {props.children}
    </FlipContext.Provider>
  )
})

export default FlipParent