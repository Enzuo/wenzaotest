import React, { Component, useState } from 'react'
import mdParser from '../utils/mdParser.js'
import {generateVocabTest} from '../utils/fuxi.js'
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

    var card = testCards[currentCard]


    // var viewList = testList.map(a => {
    //   return <Vocab d={a}></Vocab>
    // })
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
    var { currentCard, totalScore } = this.state
    this.setState({
      currentCard : currentCard + 1,
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

  var correctButton = isAnswerVisible ? <button onClick={() => onRight(props.d)}>✅Correct</button> : null
  var wrongButton = isAnswerVisible ? <button onClick={() => onWrong(props.d)}>❌Wrong</button> : null

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

const StyledLine = styled.div`
  margin: 20px;
  font-size: 32px;
  color: black;
`;

function CardElement(props){
  var {d, k, showAnswer} = props
  var testOn = 'traditional'
  var isTestedElement = k === testOn
  var element = d[k]
  element = isTestedElement && !showAnswer ? null : element

  return (
    <div className={k}>
      {element}
    </div>
  )
}

function Vocab (props) {
  const [viewAnswer, setViewAnswer] = useState(false);

  var {traditional, pinyin} = props.d

  console.log(pinyin)

  var answer = viewAnswer ? traditional : ''

  return (
    <StyledLine>
      {pinyin}
      {answer}
      <button onClick={() => setViewAnswer(true)}>View</button>
    </StyledLine>
  )
}


// User save
// [
//   id : simplified
//   rating : {
//     writingTrad : [0.5,'20210317',3]
//     tone : [0.2,'2021'
//   } 
  
// ]
