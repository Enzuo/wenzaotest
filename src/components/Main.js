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
    var {examVocab, userVocabulary} = this.state

    if(!examVocab){
      userVocabulary = learningSystem.updateSpacedRepetitionIndex(userVocabulary)
      var nbToReview = userVocabulary.reduce((acc, a) => {
        if(a.spIndex > 1){
          acc += 1
        }
        return acc
      }, 0)
      return (
        <div>
          <button onClick={this.startNewVocabulary}>New vocab</button>
          <button onClick={this.startReviewVocabulary}>Review {nbToReview}</button>
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
    var vocabToReview = learningSystem.getVocabToReview(this.state.userVocabulary)
    var examVocab = vocabToReview.map(a => a.key)
    this.setState({ examVocab })
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
