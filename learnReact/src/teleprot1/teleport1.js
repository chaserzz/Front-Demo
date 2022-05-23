import React from 'react'
import FlipChild from 'src/flip/flipChild'
import "./index.scss"
let dataList: any[] = [];
const fonts = "ashuidbasuiey12384y8sjnoijdiojdr12890u4e98asnikdbnjklabfibauihbahjcbuiy9783y9";
for (let index = 1; index <= 100; index++) {
    let str = ''
    const nums = 90 + Math.random() * 10 * index
    for(let i = 0; i < nums; i++){
        str = str + fonts[Math.floor(Math.random() * fonts.length)]
    }
    dataList.push(str);
}
export default function Teleport1() {
  return (
    <div className='teleport1'>
      <FlipChild name='teleport'>
        <p>teleport1</p>
        <img src={require('../assets/image.jpg').default}/>
        {
          dataList.map(item => <p>{item}</p>)
        }
      </FlipChild>
    </div>
  )
}
