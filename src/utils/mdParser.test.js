import {parseLessonMarkdown} from './mdParser.js'

var lessonMd = `
## Simplified dialog

## Vocabulary
梦想
明星

肯定
剧本

## Sentences
他是一名可爱的学生。
他的学问很好，是一名大学老师。
`

test('parse md lesson', () => {
  var d = parseLessonMarkdown(lessonMd)
  console.log(d)
})
