import { calculateVocabularyScoreFromHistory } from './learningSystem'




import { ANSWERS } from './constants.js'

test('calculate vocabulary score', () => {

  var userStats = [
    {
      key : '我',
      answersHistory : [['20210315', ANSWERS.EASY], ['20210321', ANSWERS.WRONG]]
    },
    {
      key : '说',
      answersHistory : [['20210315', ANSWERS.CORRECT], ['20210321', ANSWERS.WRONG], ['20210324', ANSWERS.CORRECT]]
    },
    {
      key : '中文',
      answersHistory : [['20210315', ANSWERS.EASY], ['20210316', ANSWERS.EASY], ['20210317', ANSWERS.EASY]]
    },
  ]

  var result = calculateVocabularyScoreFromHistory(userStats)

  console.log(result)



});
