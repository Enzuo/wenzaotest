
import React from 'react'
import './Main.css'
import hskTool from '../hsktool.js'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedLevel: 1 }

    this.handleLevelSelect = this.handleLevelSelect.bind(this);
  }


  render() {
    return (
      <div>
        <LevelSelect selectedLevel={this.state.selectedLevel} onSelect={this.handleLevelSelect}></LevelSelect>
        <CharacterList level={this.state.selectedLevel}></CharacterList>
      </div>
    )
  }

  handleLevelSelect(level) {
    this.setState({
      selectedLevel : level
    })
  }
}


class CharacterList extends React.Component {
  // constructor(props) {
  //   super(props);

  //   // this.state
  // }

  render() {
    var vocab = hskTool.getVocabForLevel(this.props.level)
    var nbVocab = vocab.length;

    console.log(vocab)


    // Only show different characters between traditionnal and simplified
    vocab = vocab.filter((a) => {
      return a.isDifferent
    })
    var nbVocabAfterFilter = vocab.length

    var list = vocab.map((a) => {
      return <tr><td>{a.simplified}</td><td>{a.traditional}</td><td className="pinyin">{a.pinyin}</td></tr>
    })

    return (
      <div className="character-list">
        {nbVocabAfterFilter} / {nbVocab}
        <ul>{list}</ul>
      </div>
    )
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

export default Main
