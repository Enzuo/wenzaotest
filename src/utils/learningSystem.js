import { pinyin } from 'pinyin-pro'
import { ANSWERS } from './constants.js'

const pickRandom = require('pick-random')
const Chinese = require('chinese-s2t')
// const pinyin = require('pinyin')
// var hanzi = require('hanzi')
// hanzi.start()





function getPinyin(char){
  // var a = hanzi.definitionLookup(char)
  // return a ? a.pinyin : 'no pinyin'
  return pinyin(char)
}


export function generateVocabTest (vocabList) {

  var listWords = pickRandom(vocabList, {count: 10});
  var list = listWords.map((a) => {
    return {simplified : a, traditional : Chinese.s2t(a), pinyin : getPinyin(a)}
  })

  return list
}

/* saveResult('我‘，2，’writing') */
export function saveResult (id, score, type) {


}

export function addAnswer (state, key, answer) {
  var date = Date() 
  var voc = state.find(a => a.key === key)
  
  if(!voc){
    voc = {
      key,
      answersHistory : [[date, answer]]
    }
    state.push(voc)
    return state
  }

  voc.answersHistory.push([date, answer])
  return state
}

/**
 * 
 * @param {*} vocArr 
 */
export function calculateVocabularyScoreFromHistory(vocArr) {
  return vocArr.map(st => {
    var state = {
      score : 0
    }
    for(var i=0; i<st.answersHistory.length; i++){
      state = calculateVocabularyScore(state , st.answersHistory[i])
    }
    st.score = state.score
    return st
  })
}

/**
 * 
 * @param {Object} state {score, }
 * @param {Object} answer {date, answer}
 */
function calculateVocabularyScore(state, answer){
  // TODO spaced repetition logic to award points
  var { score } = state
  switch(answer[1]){
    case ANSWERS.EASY:
      score = score + 2
      break
    case ANSWERS.CORRECT:
      score = score + 1 
      break
    case ANSWERS.WRONG:
      score = score - 1
      break
    case ANSWERS.HARD:
      score = score - 2
      break
    default:
      return state
  } 
  state.score = score
  return state
}

export function getSpacedRepetitionIndex(currentDate, score, lastDate){
  var nmlzedCurrentDate = new Date(currentDate)
  var nmlzedLastDate = new Date(lastDate)
  var timePassedTS = nmlzedCurrentDate - nmlzedLastDate
  var timePassedDays = timePassedTS / 1000 / 3600 / 24

  // Use Fibonnaci 
  var FibonnaciRatio = ((1 + Math.sqrt(5)) / 2.0)
  var nextScore = score * FibonnaciRatio
  var scoreDiff = nextScore - score
  console.log(nmlzedCurrentDate, nmlzedLastDate, timePassedDays, FibonnaciRatio)

  // 
  return parseFloat((timePassedDays / scoreDiff).toFixed(1))
}

export default {
  generateVocabTest,
  addAnswer
}
