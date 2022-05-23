import React, { memo } from 'react'
import FlipChild from 'src/flip/flipChild'
import "./index.scss"
const Teleport2 = memo(() => {
  return (
    <div className='teleport2'>
      <FlipChild name="teleport">
        <p>teleport2</p>
        <div className="inline-block ">
          somsdn
        </div>
        <img src={require('../assets/image.jpg').default}/>
      </FlipChild>
    </div>
  )
})

export default Teleport2