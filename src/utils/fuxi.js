import { pinyin } from 'pinyin-pro'
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


export default {
  generateVocabTest
}
