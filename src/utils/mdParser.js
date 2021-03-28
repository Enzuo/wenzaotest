import book3lesson1 from '../data/book3lesson2.md'
var remark = require('remark')
var markdown = require('remark-parse')
const marked = require("marked")


function getFromBlocks (blocks, search) {
  // var lexer = marked.lexer(book3lesson1)
  // var vocab = findVocabularyInMarkdown(lexer)
  // return vocab
  return blocks.reduce((acc, a) => {
    if(a.type && a.type.includes(search)){
      return acc.concat(a.data.split('\n'))
    }
    return acc
  }, [])
}

export function parseLessonMarkdown (md) {
  var lexer = marked.lexer(md)

  var blocks = findBlock(lexer)
  var vocabulary = getFromBlocks(blocks, 'vocabulary')
  var sentences = getFromBlocks(blocks, 'sentence')

  return {
    vocabulary,
    sentences,
  }
}

function findBlock(lexer){
  var blocks = []
  var header = null
  for (var i=0; i < lexer.length; i++) {
    var block = {}
    var a = lexer[i]
    if(a.type === 'heading'){
      header = a.text.toLowerCase()
    }
    else {
      if(header && a.type === 'paragraph') {
        block = {
          type : header,
          data : a.text,
        }
      }
    }
    blocks.push(block)
  }
  return blocks
}

// var MarkdownIt = require('markdown-it'),
//     md = new MarkdownIt({ html : false});
// var result = md.render(book3lesson1);
// console.log(result)


// console.log(book3lesson1)
// remark.process(book3lesson1, function (err, file) {
//   // console.error(report(err || file))
//   console.log(err)
//   console.log(String(file))
// })
// markdown.process(book3lesson1,function (err, file) {
//   console.log(err)
//   console.log(String(file))
// })

function findVocabularyInMarkdown(mdLexer){
  var vocabIndexes = mdLexer.reduce((acc, a, index) => {
    if(a.type === 'heading' && a.text.toLowerCase().includes('vocabulary')){
      acc.push(index+1)
    }
    return acc
  }, [])

  var vocabList = vocabIndexes.reduce((acc, a) => {
    if(mdLexer[a] && mdLexer[a].type === 'paragraph'){
      return acc.concat(mdLexer[a].text.split('\n'))
    }
    return acc
  }, [])

  return vocabList
}

export default {
  parseLessonMarkdown,
}
