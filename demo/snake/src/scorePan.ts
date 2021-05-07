class ScorePan{
  score: number = 0
  level: number = 1
  maxLevel: number
  scoreElement: HTMLElement
  levelElement: HTMLElement

  constructor(maxLevel: number){
    this.maxLevel = maxLevel
    this.scoreElement = document.getElementById("score") as HTMLElement  //利用断言
    this.levelElement = document.getElementById("level")!  //表明dom中一定存在该元素
  }

  addScore(){
    this.score++
    this.scoreElement.innerHTML = this.score + ""
    //每8分提高一次等级
    if(this.score % 8 === 0 && this.level < this.maxLevel){
      this.level ++
      this.levelElement.innerHTML = this.level + ""
    }
  }
}

export default ScorePan