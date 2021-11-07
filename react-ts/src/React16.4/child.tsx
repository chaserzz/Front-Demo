import React, { Fragment, PureComponent } from 'react'
interface IState {
  selfText: string
}
export default class Child extends PureComponent<{text:string},IState> {
  constructor(props:any){
    super(props);
    this.state = {
      selfText: "我是自子元素的本身的文本"
    }
  }

  getSnapshotBeforeUpdate(){
    console.log("getSnapshotBeforeUpdate");
    return {
      
    }
  }

  componentDidUpdate(props:any,state:any,snap:any){
    console.log("componentDidUpdate");
  }

  handleChangeText = () => {
    this.setState({
      selfText: "我是改变后自子元素的本身的文本"
    })
  }

  handleAlertText () {
    let propsOld = this.props;
    setTimeout(() => {
      let newProps = this.props;
      console.log(propsOld === newProps);
      console.log(propsOld,newProps);
      alert(this.props.text);
    },900)
  }
  
  render() {
    const {selfText} = this.state;
    const {text} = this.props
    return (<Fragment>
      <p>{selfText}</p>
      <p>{text}</p>
      <button onClick={this.handleChangeText}>改变我的文本</button>
      <button onClick={() => this.handleAlertText()}>Alter</button>
    </Fragment>)
  }
}
