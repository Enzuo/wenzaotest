import React, { Component } from 'react'

import * as model from '../model/index'

export default class Test2 extends Component {
  // static defaultProps = {}

  // constructor(props){
  // 	super(props)
  // }

  render() {
    return (
      <div>
        Test 2
        <button>Click</button>
        <FunctionalCounter></FunctionalCounter>
      </div>
    )
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

