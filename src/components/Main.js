import React, { Component } from 'react'
import learningSystem from '../utils/learningSystem'
import Exam from './Exam'
// import * as learningSystem from '../utils/learningSystem'

export default class Main extends Component {
  // static defaultProps = {}

  constructor(props){
  	super(props)

    this.state = {
      userVocabulary : []
    }
  }

  render() {
    return (
      <Exam onAnswer={this.handleAnswer}></Exam>
    )
  }

  handleAnswer = (a) => {
    var {key, answer} = a
    console.log(key, answer)
    var {userVocabulary} = this.state
    this.setState({
      userVocabulary : learningSystem.addAnswer(userVocabulary, key, answer)
    })
  }
}
