import React from 'react'
import "./index.scss"

export default function Teleport1() {
  return (
    <div className='teleport1'>
      <p>teleport1</p>
      <img src={require('../assets/image.jpg').default}/>
    </div>
  )
}
