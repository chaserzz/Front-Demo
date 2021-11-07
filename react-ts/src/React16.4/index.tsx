import React, { PureComponent } from 'react'
import ChildCom from "./child"
interface IState {
  text: string,
  childText: string,
  showChild: boolean
}
type handleChangeText = () => void
export default class Index extends PureComponent<any,IState> {
  constructor(props: any){
    super(props);
    this.state = {
      text: "我是父元素中的文本",
      childText: "我是子元素中的文本",
      showChild: true
    }
  }

  //改变父元素中的文本
  handleChangeText (){
    this.setState({
      text: "改变父元素的文本"
    })
  }

  //改变子元素中的文本
  handleChangeChildText (){
    this.setState({
      childText: "改变子元素中的文本"
    })
  }

  //改变子元素的是否还挂载在dom中
  handleTriggerChildShow(){
    this.setState({
      showChild: !this.state.showChild
    })
  }
  render() {
    const { text, childText, showChild } = this.state
    return (<div>
      <p>{text}</p>
      <p>
        <button onClick={() => this.handleChangeText()}>改变父元素中的文本</button>
        <button onClick={() => this.handleTriggerChildShow()}>改变子元素的显示</button>
        <button onClick={() => this.handleChangeChildText()}>改变子元素的props文本</button>
      </p>
      {showChild && <ChildCom text={childText}/>}
    </div>
    )
  }
}
