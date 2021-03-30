import React, { Component } from 'react'
import book3lesson1 from '../data/book3lesson2.md'
import learningSystem from '../utils/learningSystem'
import mdParser from '../utils/mdParser.js'
import Exam from './Exam'
import { CSVLink, CSVDownload } from "react-csv";

// import * as learningSystem from '../utils/learningSystem'

const NEWVOCABNB = 10

export default class Main extends Component {
  // static defaultProps = {}

  constructor(props){
  	super(props)

    var userVocabulary = JSON.parse(localStorage.getItem('userVocabulary')) || []
    this.state = {
      lessonVocabulary : mdParser.parseLessonMarkdown(book3lesson1).vocabulary,
      userVocabulary : learningSystem.updateSpacedRepetitionIndex(userVocabulary),
      examVocab : null,
    }
  }

  render() {
    var {examVocab, userVocabulary} = this.state

    if(!examVocab){
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
          <CSVLink data={userVocabulary} filename={"User knowledge export"}>Download user knowledge</CSVLink>
        </div>
      )
    }

    return (
      <Exam vocabList={examVocab} onAnswer={this.handleAnswer} onEnd={this.handleTestEnd}></Exam>
    )
  }

  startNewVocabulary = (e) => {
    var notInArray = this.state.userVocabulary.map(a => a.key)
    var examVocab = learningSystem.pickVocabulary(this.state.lessonVocabulary, NEWVOCABNB, notInArray)
    this.setState({ examVocab })
  }

  startReviewVocabulary = (e) => {
    var vocabToReview = learningSystem.getVocabToReview(this.state.userVocabulary)
    console.log(vocabToReview, vocabToReview)
    var examVocab = vocabToReview.map(a => a.key)
    this.setState({ examVocab })
  }

  handleAnswer = (a) => {
    var {key, answer} = a
    console.log(key, answer)
    var {userVocabulary} = this.state
    console.log(userVocabulary)
    this.setState({
      userVocabulary : learningSystem.addAnswer(userVocabulary, key, answer)
    })
    localStorage.setItem('userVocabulary', JSON.stringify(userVocabulary));
  }

  handleTestEnd = () => {
    var userVocabUpdated = learningSystem.updateSpacedRepetitionIndex(this.state.userVocabulary)
    console.log('userVocabUpdated', userVocabUpdated)
    this.setState({
      examVocab : null,
      userVocabulary : userVocabUpdated
    })
  }
}
