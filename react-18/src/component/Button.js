import React, { PureComponent } from 'react'

export default class Button extends PureComponent {

  showMessage = () => {
    const {selectedValue} = this.props
      alert(`selected ${selectedValue}`)
  }

  handleBtnClick = () => {
    setTimeout(() => {
      this.showMessage()
    }, 3000);
  }

  render() {
    return (
      <button onClick={this.handleBtnClick}>Button</button>
    )
  }
}


// export default function Button(props){
//   const {selectedValue} = props
//   const handleBtnClick = () => {
//     setTimeout(() => {
//       alert(
//         `selected ${selectedValue}`
//       )
//     }, 3000);
//   }
//   return  <button onClick={handleBtnClick}>Button</button>
// }