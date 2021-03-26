import React, { Component, useState } from 'react'
import mdParser from '../utils/mdParser.js'
import learning, {generateVocabTest, addAnswer} from '../utils/learningSystem.js'
import { ANSWERS } from '../utils/constants'
import styled from 'styled-components'
import './Exam.css'



export default class Exam extends Component {
  // static defaultProps = {}

  constructor(props){
  	super(props)

    var vocabList = mdParser.getVocabulary()

    this.state = {
      currentCard : 0,
      testCards : generateVocabTest(vocabList),
      totalScore : 0
    }

    
  }

  render() {

    var { testCards, currentCard, totalScore } = this.state

    if(currentCard === null){
      return <div>{totalScore}</div>
    }

    var card = testCards[currentCard]

    return (
      <div>
        {totalScore}
        <TestCard 
          key={currentCard}
          d={card} 
          onRight={(d) => {this.handleAnswer(d, true)}}
          onWrong={(d) => {this.handleAnswer(d, false)}}
        ></TestCard>
      </div>
    )
  }

  handleAnswer = (card, isRight) => {
    var { testCards, currentCard, totalScore } = this.state

    var newCardIndex = currentCard + 1
    if(newCardIndex >= testCards.length ){
      newCardIndex = null
    }

    if(this.props.onAnswer) {
      this.props.onAnswer({
        key : card.simplified, 
        answer : isRight ? ANSWERS.CORRECT : ANSWERS.WRONG,
      })
    }

    this.setState({
      currentCard : newCardIndex,
      totalScore : totalScore += isRight ? 10 : 5,
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
  const {onWrong, onRight} = props

  var correctButton = <button disabled={!isAnswerVisible} onClick={() => onRight(props.d)}>✅Correct</button>
  var wrongButton = <button disabled={!isAnswerVisible}  onClick={() => onWrong(props.d)}>❌Wrong</button>

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
