import React, { memo } from 'react'
import FlipChild from 'src/flip/flipChild'
import "./index.scss"
const Teleport2 = memo(() => {
  return (
    <div className='teleport2 inline-block'>
      <FlipChild name="teleport" debugName="teletport2">
        <img src={require("../assets/image.jpg").default}/>
      </FlipChild>
    </div>
  )
})

export default Teleport2