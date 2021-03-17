import React, { Component, useState } from 'react'
import mdParser from '../utils/mdParser.js'
import {generateVocabTest} from '../utils/fuxi.js'
import styled from 'styled-components'



export default class Exam extends Component {
  // static defaultProps = {}

  constructor(props){
  	super(props)

    
  }

  render() {
    var vocabList = mdParser.getVocabulary()
    var list = generateVocabTest(vocabList)

    var viewList = list.map(a => {
      return <Vocab d={a}></Vocab>
    })
    return (
      <div>{viewList}</div>
    )
  }
}

const StyledLine = styled.div`
  margin: 10px;
  font-size: 32px;
  color: black;
`;

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
