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

    var count3 = <Counter></Counter>

    if(this.state.isOn){
      return (
        <div>
          <button onClick={this.handleSwitch}>Switch</button>
          <Counter></Counter>
          <Counter></Counter>
          {count3}
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.handleSwitch}>Switch</button>
        <Counter></Counter>
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
