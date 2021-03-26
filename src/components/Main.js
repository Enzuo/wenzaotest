import React, { Component } from 'react'
import learningSystem from '../utils/learningSystem'
import mdParser from '../utils/mdParser.js'
import Exam from './Exam'
// import * as learningSystem from '../utils/learningSystem'

export default class Main extends Component {
  // static defaultProps = {}

  constructor(props){
  	super(props)

    this.state = {
      lessonVocabulary : mdParser.getVocabulary(),
      userVocabulary : JSON.parse(localStorage.getItem('userVocabulary')) || [],
      examVocab : null,
    }
  }

  render() {
    var {examVocab} = this.state

    if(!examVocab){
      return (
        <div>
          <button onClick={this.startNewVocabulary}>New vocab</button>
          <button onClick={this.startReviewVocabulary}>Review</button>
        </div>
      )
    }

    return (
      <Exam vocabList={examVocab} onAnswer={this.handleAnswer}></Exam>
    )
  }

  startNewVocabulary = (e) => {
    var examVocab = learningSystem.pickVocabulary(this.state.lessonVocabulary, this.state.userVocabulary)
    this.setState({ examVocab })
  }

  startReviewVocabulary = (e) => {

  }

  handleAnswer = (a) => {
    var {key, answer} = a
    console.log(key, answer)
    var {userVocabulary} = this.state
    this.setState({
      userVocabulary : learningSystem.addAnswer(userVocabulary, key, answer)
    })
    localStorage.setItem('userVocabulary', JSON.stringify(userVocabulary));
  }
}
