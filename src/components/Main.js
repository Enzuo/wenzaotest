
import React from 'react'
import './Main.css'
import hskTool from '../hsktool.js'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      level: 1, 
      user : '' 
    }
    this.state.userSave = getSaveForUser(this.state.user, this.state.level)
    this.state.vocabList = hskTool.getVocabForLevel(this.state.level)

    this.handleLevelSelect = this.handleLevelSelect.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleCharacterAnswer = this.handleCharacterAnswer.bind(this);
  }


  render() {
    return (
      <div>
        <input className="user" value={this.state.user} onChange={this.handleUserChange}></input>
        <LevelSelect selectedLevel={this.state.level} onSelect={this.handleLevelSelect}></LevelSelect>
        <CharacterList vocab={this.state.vocabList} userSave={this.state.userSave} onCharacterAnswer={this.handleCharacterAnswer}></CharacterList>
      </div>
    )
  }

  handleLevelSelect(level) {
    var vocabList = hskTool.getVocabForLevel(level)
    var userSave = getSaveForUser(this.state.user, level)

    this.setState({
      level : level,
      vocabList,
      userSave,
    })
  }

  handleUserChange(e){
    var user = e.target.value
    var userSave = getSaveForUser(user, this.state.level)

    this.setState({ 
      user : e.target.value,
      userSave,
    })
  }

  handleCharacterAnswer(id, answer){
    var newSave = this.state.userSave
    newSave[id] = answer
    this.setState({
      userSave : newSave
    })
    saveForUser(this.state.user, this.state.level, newSave)
  }
}


class CharacterList extends React.Component {
  constructor(props) {
    super(props);

    this.handleCorrectClick = this.handleCorrectClick.bind(this);
    this.handleWrongClick = this.handleWrongClick.bind(this);
  }

  render() {
    // var vocab = hskTool.getVocabForLevel(this.props.level)
    var vocab = this.props.vocab
    var userSave = this.props.userSave
    
    // Strip the list down to only different characters between traditionnal and simplified
    var nbVocab = vocab.length;
    vocab = vocab.filter((a) => {
      return a.isDifferent
    })
    var nbVocabAfterFilter = vocab.length

    // Calculate with the user save the percent of correct answers
    var nbAnswers = 0
    for (const [key, value] of Object.entries(userSave)) {
      if(value === true) nbAnswers++
    }
    var percent = Math.floor(nbAnswers/nbVocabAfterFilter * 100)

    
    var list = vocab.map((a) => {
      var dictUrl = 'https://www.archchinese.com/chinese_english_dictionary.html?find='+a.traditional


      var correctButtonClass = 'buttons'
      var wrongButtonClass = 'buttons'
      var wordClass = ''
      if(userSave[a.id] === true){
        correctButtonClass += ' selected'
      }
      if(userSave[a.id] === false){
        wrongButtonClass += ' selected'
      }
      if(userSave[a.id] === undefined){
        wordClass = ' hidden'
      }


      return <tr>
        <td className="trad"><a href={dictUrl}>{a.traditional}</a></td>
        <td className={"simp" + wordClass}>{a.simplified}</td>
        <td className={"pinyin" + wordClass}>{a.pinyin}</td>
        <td className={correctButtonClass} data-value={a.id} onClick={this.handleCorrectClick}>✅</td>
        <td className={wrongButtonClass} data-value={a.id} onClick={this.handleWrongClick}>❌</td>
      </tr>
    })


    return (
      <div className="character-list">
        <span>{nbVocabAfterFilter} / {nbVocab}</span> - <span className="score">{percent}%</span>
        <table>{list}</table>
      </div>
    )
  }

  handleCorrectClick(e){
    var id = e.target.getAttribute('data-value')
    this.props.onCharacterAnswer(id, true)
  }

  handleWrongClick(e){
    var id = e.target.getAttribute('data-value')
    this.props.onCharacterAnswer(id, false)
  }
}


class LevelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const levels = [1, 2, 3, 4, 5]
    const listLevels = levels.map((number) => {
      var selected = (number === this.props.selectedLevel)
      var className = 'level' 
      className += selected ? ' selected' : ''
      return <li value={number} className={className} onClick={this.handleClick}>{number}</li>
    });

    return <ul className="level-select">{listLevels}</ul>
  }

  handleClick(e) {
    this.props.onSelect(e.target.value);
  }
}

function getSaveForUser (user, level) {
  var save = localStorage.getItem(user+level)
  if(!save){
    return {}
  }

  if(typeof save === 'string'){
    save = JSON.parse(save)
  }
  if(typeof save === 'object'){
    return save
  }
  return {}
}

function saveForUser(user, level, save) {
  console.log('save for user', user, level, save)
  localStorage.setItem(user+level, JSON.stringify(save));
}

export default Main
