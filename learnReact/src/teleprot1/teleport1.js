import React from 'react'
import FlipChild from 'src/flip/flipChild'
import "./index.scss"
export default function Teleport1() {
  return (
    <div className='teleport1 inline-block'>
      <FlipChild name='teleport' debugName="teleport1">
        <img src={require("../assets/image.jpg").default}/>
      </FlipChild>
    </div>
  )
}
