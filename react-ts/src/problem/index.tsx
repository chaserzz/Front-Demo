import React,{} from "react"
import "./index.scss"
const urlencode = require("urlencode")
type P = {
  [propName: string] : any
}

export default function Problem(props: P) {
  function handleBtnClick(){
    console.log(urlencode('苏千')); // default is utf8
    console.log(urlencode('苏千', 'gbk')); // '%CB%D5%C7%A7'
    // decode gbk
    urlencode.decode('%CB%D5%C7%A7', 'gbk'); // '苏千'
  }
  return (
    <>
    <div>
      a demo to make string encode by gbk
    </div>
    <button onClick={handleBtnClick}>
      click
    </button>
    </>
  )
}