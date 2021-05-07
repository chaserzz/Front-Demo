class Food{
  element: HTMLElement

  constructor(){
    this.element = document.getElementById("food") as HTMLElement
  }

  get X(){
    return this.element.offsetLeft
  }

  get Y(){
    return this.element.offsetTop
  }

  set X(value: number){
    this.element.style.left = value + "px"
  }

  set Y(value :number){
    this.element.style.top = value + "px"
  }

  //切换food的位置
  changePosition(){
    //获得0~280内并且为10的倍数的随机数。  280是由框的290px-食物的10px
    let x = (Math.round(Math.random() * 28)) * 10
    let y = (Math.round(Math.random() * 28)) * 10

    this.X = x
    this.Y = y
  }
}

export default Food