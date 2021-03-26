import React, { Component, useState } from 'react'
import mdParser from '../utils/mdParser.js'
import learningSystem from '../utils/learningSystem.js'
import { ANSWERS } from '../utils/constants'
import styled from 'styled-components'
import './Exam.css'



export default class Exam extends Component {
  // static defaultProps = {}

  constructor(props){
  	super(props)

    // var vocabList = learningSystem.pickVocabList(mdParser.getVocabulary())


    this.state = {
      currentCard : 0,
      // testCards : learningSystem.generateTestCards(vocabList),
      totalScore : 0
    }

    
  }

  render() {

    var { currentCard, totalScore } = this.state
    var { vocabList } = this.props

    if(currentCard === null){
      return <div>{totalScore}</div>
    }

    var testCards = learningSystem.generateTestCards(vocabList)

    var card = testCards[currentCard]

    return (
      <div>
        {totalScore}
        <TestCard 
          key={currentCard}
          d={card} 
          onAnswer={(d, a) => {this.handleAnswer(d, a)}}
        ></TestCard>
      </div>
    )
  }

  handleAnswer = (card, answer) => {
    var { currentCard, totalScore } = this.state
    var { vocabList } = this.props


    var newCardIndex = currentCard + 1
    if(newCardIndex >= vocabList.length ){
      newCardIndex = null
    }

    if(this.props.onAnswer) {
      this.props.onAnswer({
        key : card.simplified, 
        answer
      })
    }

    this.setState({
      currentCard : newCardIndex,
      totalScore : totalScore += answer === ANSWERS.CORRECT ? 10 : 5,
    })
  }
}

const Card = styled.div`
  border: 1px solid #000;
  font-size: 40px;
  padding:15px;
  margin:10px
`

function TestCard (props){
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const {onAnswer} = props

  var correctButton = <button disabled={!isAnswerVisible} onClick={() => onAnswer(props.d, ANSWERS.CORRECT)}>✅Correct</button>
  var wrongButton = <button disabled={!isAnswerVisible}  onClick={() => onAnswer(props.d, ANSWERS.WRONG)}>❌Wrong</button>

  return (
    <Card>
      <CardElement d={props.d} k="pinyin" showAnswer={isAnswerVisible}></CardElement>
      <CardElement d={props.d} k="traditional" showAnswer={isAnswerVisible}></CardElement>
      <button onClick={() => setIsAnswerVisible(true)}>👁‍🗨View</button>
      {correctButton}
      {wrongButton}
    </Card>
  )
}

function CardElement(props){
  var {d, k, showAnswer} = props
  var testOn = 'traditional'
  var isTestedElement = k === testOn
  var element = d[k]
  var className = k + (isTestedElement && !showAnswer ? ' hide' : '')

  return (
    <div className={className}>
      {element}
    </div>
  )
}

// User save
// vocabulary : 
// [
//   id : simplified
//   writing : [[date, score]]
// ]
