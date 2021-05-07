class Snake{
  head: HTMLElement  //蛇头
  body: HTMLCollection  //蛇身
  snake_container: HTMLElement //蛇容器
  
  constructor(){
    //获得蛇，蛇身，蛇容器
    this.snake_container = document.getElementById("snake")!
    this.head = document.querySelector("#snake>div")!
    this.body = this.snake_container.getElementsByTagName("div")
  }

  //获得蛇头的X
  get X(){
    return this.head.offsetLeft
  }

  //获得蛇头的Y
  get Y(){
    return this.head.offsetTop
  }

  //设置蛇头的X向移动
  set X(value: number){
    if(value === this.X) return  
    //撞墙的判断
    if(value < 0 || value > 280){
      throw new Error("撞到墙了")
    }
    let bd = this.body[1] as HTMLElement
    //如果有身体，并且身体的value值与bd的value值相同则说明进行了横向转向
    if( bd && bd.offsetLeft === value ){
      //设置的value大于X坐标，说明蛇目前是向坐行走，保持向左行走的赋值
      if(value > this.X){
        value = this.X - 10
      }else{
        value = this.X + 10
      }
    }
    //身体移动
    this.moveBody()
    this.head.style.left = value + "px"
    if(this.touchBody()){
      throw new Error("撞到身体")
    }
  }

  //设置蛇头的Y向移动
  set Y(value: number){
    if(value === this.Y) return  
    //撞墙的判断
    if(value < 0 || value > 280){
      throw new Error("撞到墙了")
    }
    //掉头判断
    let bd = this.body[1] as HTMLElement
    //如果有身体，并且身体的value值与bd的value值相同则说明进行了横向转向
    if( bd && bd.offsetTop === value ){
      //value大于本身Y,说明蛇目前是向下行走，保持向下行走的赋值
      if(value > this.Y){
        value = this.Y - 10
      }else{
        value = this.Y + 10
      }
    }
    //身体移动
    this.moveBody()
    this.head.style.top = value + "px"
    if(this.touchBody()){
      throw new Error("撞到身体")
    }
  }

  //添加身体的长度 
  addBody(){
    this.snake_container.insertAdjacentHTML("beforeend",`<div></div>`)
  }

  //身体的移动
  moveBody(){
    for(let i = this.body.length - 1; i > 0; i--){
      //每个身体的坐标由上一个身体的坐标组成
      const last = this.body[i-1] as HTMLElement
      const target = this.body[i] as HTMLElement
      target.style.left = last.offsetLeft + "px"
      target.style.top = last.offsetTop + "px"
    }
  }

  //触碰身体
  touchBody(){
    //对所有的身体进行遍历判断
    for(let i = this.body.length - 1; i>0; i--){
      const bd = this.body[i] as HTMLElement
      if(bd.offsetLeft === this.X && bd.offsetTop === this.Y){
        return true
      }
    }
    return false
  }
}

export default Snake