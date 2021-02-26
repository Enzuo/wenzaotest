
import React from 'react'
import './Main.css'
import hskTool from '../hsktool.js'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedLevel: 1, user : '' }

    this.handleLevelSelect = this.handleLevelSelect.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }


  render() {
    return (
      <div>
        <input className="user" value={this.state.user} onChange={this.handleUserChange}></input>
        <LevelSelect selectedLevel={this.state.selectedLevel} onSelect={this.handleLevelSelect}></LevelSelect>
        <CharacterList key={this.state.selectedLevel} level={this.state.selectedLevel} user={this.state.user}></CharacterList>
      </div>
    )
  }

  handleLevelSelect(level) {
    this.setState({
      selectedLevel : level
    })
  }
  handleUserChange(e){
    this.setState({ user : e.target.value })
  }
}


class CharacterList extends React.Component {
  static defaultProps = {
    user : 'enzo'
  }

  constructor(props) {
    super(props);

    // this.state = {
    //   userSave : getSaveForUser(this.props.user, this.props.level)
    // }

    this.handleCorrectClick = this.handleCorrectClick.bind(this);
    this.handleWrongClick = this.handleWrongClick.bind(this);
  }

  render() {
    var vocab = hskTool.getVocabForLevel(this.props.level)
    var nbVocab = vocab.length;

    var userSave = getSaveForUser(this.props.user, this.props.level)

    // Only show different characters between traditionnal and simplified
    vocab = vocab.filter((a) => {
      return a.isDifferent
    })
    var nbVocabAfterFilter = vocab.length

    
    var list = vocab.map((a) => {
      var dictUrl = 'https://www.archchinese.com/chinese_english_dictionary.html?find='+a.traditional


      var correctButtonClass = 'buttons'
      var wrongButtonClass = 'buttons'
      if(userSave[a.id] === true){
        correctButtonClass += ' selected'
      }
      if(userSave[a.id] === false){
        wrongButtonClass += ' selected'
      }

      return <tr>
        <td className="trad"><a href={dictUrl}>{a.traditional}</a></td>
        <td className="simp">{a.simplified}</td>
        <td className="pinyin">{a.pinyin}</td>
        <td className={correctButtonClass} data-value={a.id} onClick={this.handleCorrectClick}>✅</td>
        <td className={wrongButtonClass} data-value={a.id} onClick={this.handleWrongClick}>❌</td>
      </tr>
    })


    var nbAnswers = 0
    for (const [key, value] of Object.entries(userSave)) {
      if(value === true) nbAnswers++
    }

    var percent = Math.floor(nbAnswers/nbVocabAfterFilter * 100)

    return (
      <div className="character-list">
        <span>{nbVocabAfterFilter} / {nbVocab}</span> - <span className="score">{percent}%</span>
        <table>{list}</table>
      </div>
    )
  }

  handleCorrectClick(e){
    var id = e.target.getAttribute('data-value')
    var newSave =  getSaveForUser(this.props.user, this.props.level)
    newSave[id] = true
    setSaveForUser(this.props.user, this.props.level, newSave)
    this.forceUpdate()
  }

  handleWrongClick(e){
    var id = e.target.getAttribute('data-value')
    var newSave = getSaveForUser(this.props.user, this.props.level)
    newSave[id] = false
    setSaveForUser(this.props.user, this.props.level, newSave)
    this.forceUpdate()
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

function setSaveForUser(user, level, save) {
  console.log('save for user', user, level, save)
  localStorage.setItem(user+level, JSON.stringify(save));
}

export default Main
