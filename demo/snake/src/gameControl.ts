import Food from "./food"
import ScorePan from "./scorePan"
import Snake from "./snake"
import { SnakeBodyPosition } from "./type"
class GameControl{
  food: Food
  snake: Snake
  scorePan: ScorePan
  direct: string = ""  //方向
  isLive: boolean = true //游戏结束标志

  constructor(maxLevel: number){
    this.food = new Food()
    this.snake = new Snake()
    this.scorePan = new ScorePan(maxLevel)
    this.init()
  }
  //初始化游戏
  init(){
    //设置食物位置 
    this.food.changePosition()
    //键盘下按事件
    document.addEventListener("keydown",this.handleKeyDown.bind(this))
    this.run()

  }
  //键盘按下事件
  handleKeyDown(e: KeyboardEvent){
    this.direct = e.code
  }
  
  //控制蛇的走动
  run(){
    //获得蛇的头部坐标
    let X = this.snake.X
    let Y = this.snake.Y
    //为了方便游戏结束的判断，不直接对snake的坐标进行赋值
    switch (this.direct) {
      //向上移动
      case "ArrowUp":{
        Y -= 10
        break
      }
      //向下移动
      case "ArrowDown":{
        Y += 10
        break
      }
      //向左移动
      case "ArrowLeft":{
        X -= 10
        break
      }
      //向右移动
      case "ArrowRight":{
        X += 10
        break
      }
    }
    //判断是否得分
    this.ifGetScore(X,Y)

    try {
      //将新的坐标赋值给蛇头
      this.snake.X = X
      this.snake.Y = Y
    } catch (error) {
      //撞墙则会报错，获取报错并结束游戏
      this.isLive = false
      alert("游戏结束")
    }

    //重复调用，使得蛇保持移动
    this.isLive && setTimeout(this.run.bind(this),200 - (this.scorePan.level - 1) * 10)
  }

  //获得分数，X,Y为蛇头即将到达的坐标
  ifGetScore(X: number,Y: number){
    if(X === this.food.X && Y === this.food.Y){
      this.scorePan.addScore()  //加分
      const snakeBodyPosition = this.getSnakeBodyPosition()
      this.food.changePosition()

      //是否存在蛇身体与食物重合的falg
      let sameFlag = snakeBodyPosition.some((item) => {
        return item.left === this.food.X && item.top === this.food.Y
      })  
      while(sameFlag){
        this.food.changePosition()
        sameFlag = snakeBodyPosition.some((item) => {
          return item.left === this.food.X && item.top === this.food.Y
        })
      }
      //判断食物的位置是否符合要求，即不出现在蛇的身体上
      this.snake.addBody()
    }
  }

  //获得蛇的所有的身体的坐标
  getSnakeBodyPosition: (this: GameControl) => Array<SnakeBodyPosition> = function(this){
    let result = []
    //遍历蛇的身体
    for(let item of this.snake.body){
      //将蛇的身体的坐标直接push进入数组
      const position :SnakeBodyPosition ={
        left: (item as HTMLElement).offsetLeft,
        top: (item as HTMLElement).offsetTop
      }
      result.push(position)
    }
    return result
  }
}

export default GameControl