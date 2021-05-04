import { debonce } from "./debonceAndThrottle"

//图片懒加载
let imgList = [...document.querySelectorAll('img')]
let length = imgList.length

const imgLazyLoad = (function() {
   let count = 0
   
  return function() {
       let deleteIndexList = []
       imgList.forEach((img, index) => {
           let rect = img.getBoundingClientRect()  //用于获取某个元素相对于视窗的位置集合
           //当前图片进入到浏览器页面中
           if (rect.top < window.innerHeight) {
               img.src = img.dataset.src
               deleteIndexList.push(index)
               count++
               //如果所有图片都已经加载完毕
               if (count === length) {
                   document.removeEventListener('scroll', imgLazyLoad)
               }
           }
       })
       imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
  }
})()

//加上防抖处理
document.addEventListener('scroll', debonce(imgLazyLoad))
