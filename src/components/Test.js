import React, { Component } from 'react'

export default class Test extends Component {
  // static defaultProps = {}

  // constructor(props){
  // 	super(props)
  // }

  render() {
    return (
      <SwitchOnOff></SwitchOnOff>
    )
  }
}

class SwitchOnOff extends Component {
  constructor(props){
    super(props)

    this.state = {
      isOn : false
    }
  }

  render() {

    if(this.state.isOn){
      return (
        <div>
          <button onClick={this.handleSwitch}>Switch</button>
          <Counter></Counter>
          <FunctionalCounter></FunctionalCounter>
          <Counter></Counter>
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.handleSwitch}>Switch</button>
        <Counter></Counter>
        <Counter></Counter>
        <FunctionalCounter></FunctionalCounter>
      </div>
    )
  }

  handleSwitch = (e) => {
    this.setState({
      isOn : !this.state.isOn
    })
  }
}

class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count : 0
    }
  }

  render () {
    console.log('render counter', this.state.count)
    return (
      <div>
        <p>Count : {this.state.count}</p>
        <button onClick={this.add}>+</button>
      </div>
    )
  }

  add = (e) => {
    this.setState({
      count : this.state.count + 1
    })
  }
}


function FunctionalCounter (props) {
  const [count, setCount] = React.useState(0);


  return (
    <div>
    <p>Functional Count : {count}</p>
    <button onClick={(e) => setCount(count+1)}>+</button>
    </div>
  )
}
