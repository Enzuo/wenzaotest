import React, { Component } from 'react'

import {database} from '../model/index'

export default class Test2 extends Component {
  // static defaultProps = {}

  // constructor(props){
  // 	super(props)
  // }

  render() {
    return (
      <div>
        Test 2
        <button onClick={this.handleClick}>Click</button>
        <FunctionalCounter></FunctionalCounter>
      </div>
    )
  }

  handleClick = async (e) => {
    const postsCollection = database.collections.get('posts')
    console.log(postsCollection, database)
    await database.action(async () => {
      const newPost = await postsCollection.create(post => {
        post.title = 'New post'
        post.body = 'Lorem ipsum...'
      })
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

