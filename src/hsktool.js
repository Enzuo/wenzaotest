// const hanzitools = require('hanzi-tools')
// const OpenCC = require('opencc');
const Chinese = require('chinese-s2t')

const rawhskvoc = [
  require('./data/hsk-level-1.json'), 
  require('./data/hsk-level-2.json'), 
  require('./data/hsk-level-3.json'), 
  require('./data/hsk-level-4.json'), 
  require('./data/hsk-level-5.json')
]

const hskvoc = rawhskvoc.map(function(lvl){
  return lvl.map(function(a){
    var simplified = a.hanzi
    var pinyin = a.pinyin
    // var traditional = hanzitools.traditionalize(simplified);
    var traditional = Chinese.s2t(simplified)
    var isDifferent = simplified !== traditional
    return { id : a.id, simplified, traditional, isDifferent, pinyin }
  })
})


// var vocab = hskvoc.map(function(a){
//     return a.hanzi
// })

// console.log(hskvoc[0])
// var nbdifferents = 0;
// for(var i=0; i < vocab.length; i++){
//     var simplified = vocab[i];
//     var traditional = hanzitools.traditionalize(vocab[i]);
    
//     if(simplified !== traditional){
//         console.log(simplified, traditional)
//         nbdifferents++;
//     }
//     // console.log(vocab[i], )
// }
// console.log('nb of characters : ', vocab.length, ', different between traditionnal & simplified : ', nbdifferents)

function getVocabForLevel (level) {
  var voc = hskvoc[level-1]
  return voc
}

const hskTool = {
  getVocabForLevel
}

export default hskTool
