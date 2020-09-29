import React from 'react';
import '../index.css';
import GetRandomCard from './GetRandomCard';
import MatchAnswer from './MatchAnswer';
import CheckAnswer from './CheckAnswer';
import Progress from './Progress';
import StartAgain from './StartAgain';

import { Link } from 'react-router-dom'

class FlashCards extends React.Component {
  state = {showFront: true, showBack: false, chosenIndex: '', isFlipped: false, questionsCounter: 0, isCompleted: false};

  getIndex = (index) => {
    this.setState({chosenIndex: index});
  }

  flip = () => {  
    this.setState({showFront: false, isFlipped: true});
    console.log(this.state.isFlipped);
  }

  onYesNoClick = () => {
    this.setState({isFlipped: false});
  }

  updateDelete = () => {
    this.props.updateDelete(this.state.chosenIndex);
    this.setState((prevState, prevProps) => {
      return {questionsCounter: prevState.questionsCounter + 1}
    });
  }

  updateOnComplete = () => {
    console.log('complete');
    this.setState({questionsCounter:0, isCompleted: true});
  }

  onStartClick = () => {
    this.setState({isCompleted: false});
  }

  setFront = () => {this.setState({showFront:true})};
  // setBack = () => {this.setState({showBack:true, showFront:false})};
  
  render(){
    console.log(this.state.questionsCounter);
    return (
      <div className="container">
        <div className="leftSide">
          <Progress cardsArr={this.props.cardsArr} questionsCounter={this.state.questionsCounter} updateOnComplete={this.updateOnComplete}/>
        </div>
        <div className="middle">
          <div className={"card" + (this.state.isFlipped ? " is-flipped" : "")}>
            <div className="frontDiv">
              {this.state.showFront && <GetRandomCard cardsArr={this.props.cardsArr} chosenIndex={this.getIndex}/>}
            </div>
            <div className="backDiv">
                {<MatchAnswer cardsArr={this.props.cardsArr} chosenIndex={this.state.chosenIndex}/>}
            </div>
          </div>
          <div className="buttons">
            <button onClick={this.setFront}>new card</button>
            <button onClick={this.flip}>reveal answer</button>
          </div>
        </div>
        <div className="rightSide">
          <CheckAnswer 
          cardsArr={this.props.cardsArr} 
          chosenIndex={this.state.chosenIndex} 
          onYesNoClick={this.onYesNoClick} 
          onYesClick={this.updateDelete}
          />
          {this.state.isCompleted && <StartAgain onStartClick={this.onStartClick}/>}
        </div>
      </div>
      );
  }
}

export default FlashCards;
