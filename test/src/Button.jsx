import React from 'react'

export default function Button(props){
  const {handleBtnClick} = props;
  return <button onClick={handleBtnClick}>
  {props.children}
  </button>
}