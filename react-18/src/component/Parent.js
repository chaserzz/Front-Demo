import {Component} from 'react'
import Button from './Button';
export default class Parent extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedValue : ''
    }
  }
  
  handleSelectedChange = (e) => {
    this.setState({
      selectedValue: e.target.value
    })
  } 
  render(){
    const {selectedValue} = this.state
    return (
    <>
      <select value={selectedValue} onChange={this.handleSelectedChange}>
        <option value='A'>A</option>
        <option value='B'>B</option>
        <option value='C'>C</option>
      </select>
      <Button selectedValue={selectedValue}/>
    </>)
  }
}