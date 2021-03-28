import { pinyin } from 'pinyin-pro'
import { ANSWERS, EFACTOR } from './constants.js'

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


export function pickVocabulary (vocabList, count, notin) {
  count = count || 10
  var filteredVocabList = vocabList.filter(a => !notin.includes(a))
  return pickRandom(filteredVocabList, {count});
}

export function generateTestCards (vocabList) {
  return vocabList.map((a) => {
    return {simplified : a, traditional : Chinese.s2t(a), pinyin : getPinyin(a)}
  })
}



export function updateSpacedRepetitionIndex(userVocab) {
  console.log('update spaced repetition index')
  return  userVocab.map(voc => {
    var today = Date()
    var lastAnswer = voc.answersHistory[voc.answersHistory.length-1]
    return {...voc, spIndex : getSpacedRepetitionIndex(today, voc.score, lastAnswer[0])}
  })
}

export function getVocabToReview(userVocabWithspIndex, number){
  var userVocabSorted = userVocabWithspIndex.sort((a, b) => b.spIndex - a.spIndex)
  return userVocabSorted.slice(0, number)
}

export function addAnswer (vocArray, key, answerResult) {
  var date = Date()
  var answer = [date, answerResult]
  var voc = vocArray.find(a => a.key === key)

  if(!voc){
    voc = {
      key,
      answersHistory : [answer],
      score : 0
    }
    voc = calculateVocabularyScore(voc, answer)
    vocArray.push(voc)
    return vocArray
  }

  var lastAnswer = voc.answersHistory[voc.answersHistory.length-1]
  voc = calculateVocabularyScore(voc, answer, lastAnswer)
  voc.answersHistory.push(answer)
  return vocArray
}

/**
 *
 * @param {*} vocArr
 */
export function calculateVocabularyScoreFromHistory(vocArr) {
  return vocArr.map(st => {
    var state = {
      ...st,
      score : 0,
    }
    for(var i=0; i<st.answersHistory.length; i++){
      state = calculateVocabularyScore(state , st.answersHistory[i], st.answersHistory[i-1])
    }
    return state
  })
}

/**
 *
 * @param {Object} state {score, }
 * @param {Array} answer [date, answerResult]
 */
function calculateVocabularyScore(state, answer, lastAnswer){
  var answerDate = answer[0]
  var answerResult = answer[1]
  var { score, efactor } = state
  efactor = updateEFactor(efactor, answerResult)
  var lastAnswerDate = lastAnswer ? lastAnswer[0] : null
  var defaultScore = 1
  var daysScore = getDaysBetween(answerDate, lastAnswerDate)
  daysScore = Math.max(daysScore, defaultScore)

  switch(answerResult){
    case ANSWERS.EASY:
      score = score + (daysScore * 2 * efactor)
      break
    case ANSWERS.CORRECT:
      score = score + (daysScore * efactor)
      break
    case ANSWERS.WRONG:
      score = score / (2 / efactor)
      break
    case ANSWERS.HARD:
      score = 1
      break
    default:
      return state
  }

  state.score = score
  state.efactor = efactor
  return state
}

export function getSpacedRepetitionIndex(currentDate, score, lastDate){
  var timePassedDays = getDaysBetween(currentDate, lastDate)

  // Use Fibonacci
  var FibonnaciRatio = ((1 + Math.sqrt(5)) / 2.0)
  var nextScore = score * FibonnaciRatio
  var scoreDiff = nextScore - score

  if(!scoreDiff) {
    return Infinity
  }
  return parseFloat((timePassedDays / scoreDiff).toFixed(1))
}

function getDaysBetween(date1, date2){
  if(!date1 || !date2 ){
    return 0
  }
  var nmlzedCurrentDate = new Date(date1)
  var nmlzedLastDate = new Date(date2)
  var timePassedTS = Math.abs(nmlzedCurrentDate - nmlzedLastDate)
  var timePassedDays = timePassedTS / 1000 / 3600 / 24

  return timePassedDays
}

// With fibonacci number suite
// for a score of 80 days we will see it 10 times, this gives use a efactor of 1.5
// [1,2,3,5,8,13,21,34,55,]
function updateEFactor(efactor, answerResult){
  if(!efactor){
    efactor = 1
  }
  efactor = efactor * EFACTOR[answerResult]

  // return efactor
  return Math.max(Math.min(efactor, EFACTOR.MAX),EFACTOR.MIN)
}

export default {
  pickVocabulary,
  addAnswer,
  generateTestCards,
  updateSpacedRepetitionIndex,
  getVocabToReview,
}
