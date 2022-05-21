import React, { memo } from 'react'
import "./index.scss"
const Teleport2 = memo(() => {
  return (
    <div className='teleport2'>
      <p>teleport2</p>
      <div className="inline-block ">
        somsdn
      </div>
      <img src={require('../assets/image.jpg').default}/>
    </div>
  )
})

export default Teleport2