import { calculateVocabularyScoreFromHistory, getSpacedRepetitionIndex } from './learningSystem'




import { ANSWERS } from './constants.js'

test('calculate vocabulary score', () => {

  var userStats = [
    {
      key : '我',
      answersHistory : [['2021-03-15', ANSWERS.EASY], ['2021-03-21', ANSWERS.WRONG]]
    },
    {
      key : '可以',
      answersHistory : [['2021-03-15', ANSWERS.EASY], ['2021-04-15', ANSWERS.CORRECT]]
    },
    {
      key : '说',
      answersHistory : [['2021-03-15', ANSWERS.CORRECT], ['2021-03-21', ANSWERS.WRONG], ['2021-03-24', ANSWERS.CORRECT]]
    },
    {
      key : '中文',
      answersHistory : [['2021-03-15', ANSWERS.EASY], ['2021-03-16', ANSWERS.EASY], ['2021-03-17', ANSWERS.EASY]]
    },
  ]

  var result = calculateVocabularyScoreFromHistory(userStats)

  console.log(result)
})

test('return vocabulary space repetition index (fibonacci', () => {
  var voc = {
    key : '我',
    answersHistory : [['2021-03-15', ANSWERS.EASY], ['2021-03-21', ANSWERS.WRONG]],
    score : 5
  }

  expect(getSpacedRepetitionIndex('2021-03-24', voc.score, '2021-03-21')).toBe(1)
  expect(getSpacedRepetitionIndex('2021-03-24', voc.score, '2021-03-22')).toBe(0.6)
  expect(getSpacedRepetitionIndex('2021-03-24', voc.score, '2021-03-20')).toBe(1.3)
  expect(getSpacedRepetitionIndex('2021-03-24', 8, '2021-03-19')).toBe(1)
})
