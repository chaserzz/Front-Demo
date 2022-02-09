import React from 'react';
import ReactDOM from 'react-dom';
import Problem from "./problem";
let dataList = [];
const fonts = "ashuidbasuiey12384y8sjnoijdiojdr12890u4e98asnikdbnjklabfibauihbahjcbuiy9783y9";
for (let index = 1; index <= 1000; index++) {
    let str = ''
    const nums = index * Math.random() * 70
    for(let i = 0; i < nums; i++){
        str = str + fonts[Math.floor(Math.random() * fonts.length)]
    }
    dataList.push(str);
}
ReactDOM.render(
    <Problem  screenHeight={400} estimatedItemSize={40} dataList={dataList}/>,  document.getElementById('root')
);
