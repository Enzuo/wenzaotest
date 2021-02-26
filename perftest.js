const { PerformanceObserver, performance } = require('perf_hooks');

const hanzitools = require('hanzi-tools')

const OpenCC = require('opencc')
const converter = new OpenCC('s2t.json');

const Chinese = require('chinese-s2t')





var vocab = require('./src/data/hsk-level-3.json')



// init performance observer
const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].name, items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });


// Test 1
performance.mark('A')

vocab.map(function(a){
  return a.hanzi
})

performance.measure('perf temoin', 'A')

// Test 2
performance.mark('B')

var T2 = vocab.map(function(a){
  return hanzitools.traditionalize(a.hanzi)
})

performance.measure('perf hanzi-tools', 'B')

// Test 3

performance.mark('C')

vocab.map(async function(a){
  return await converter.convertPromise(a.hanzi)
})

performance.measure('open cc', 'B')

// Test 4


// Test 5

performance.mark('E')

var T5 = vocab.map(function(a){
  return Chinese.s2t(a.hanzi)
})

performance.measure('chinese t2s', 'E')


console.log('length', T2.length, T5.length)
for(var i=0; i<T2.length; i++){
  if(T2[i] !== T5[i]){
    console.log(vocab[i].hanzi, T2[i], T5[i]);
  }
}


