import React from 'react';
import '../index.css';

class CardsManager extends React.Component {
  state = {readMode: true, editMode: false, selectedQuestion: '', editedQuestion:'', editedAnswer: ''};

  onEditHandler = (e) => {
    this.setState ({readMode: false, editMode: true, selectedQuestion: e.target.parentElement.parentElement.firstElementChild.innerHTML});
  }

  onSaveHandler = (e, id, mode) => {
    e.preventDefault();
    if (mode === 'create'){
      this.setState({selectedQuestion: ''});
    }
    const editedItem = {
      id: id,
      question: this.state.editedQuestion,
      answer: this.state.editedAnswer 
    }
    this.props.selectedQuestionAndMode(this.state.selectedQuestion, mode, editedItem);
  }

  onDeleteHandler = (e) => {
    const selectedQuestion = e.target.parentElement.parentElement.firstElementChild.innerHTML;
    this.setState ({selectedQuestion: selectedQuestion});
    this.props.selectedQuestionAndMode(selectedQuestion,e.target.innerHTML);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      cardsArr : nextProps.cardsArr
    });
  }

  displayCardDiv = (card) => {
    return(
      <div className="cardDiv" key={card.id}>
          <p>question: {card.question}</p>
          <p>answer: {card.answer}</p>
          <div className="buttons">
            <button onClick={this.onEditHandler}>edit</button>
            <button onClick={this.onDeleteHandler}>delete</button>
          </div>
      </div>
    );
  }

  displayFormDiv = (card, mode) => {
    return (
      <div className="cardDiv" key={card.id}>
          <form onSubmit={e => this.onSaveHandler(e,card.id, mode)}>
            <label>question:</label>
            <input type="text" placeholder={card.question} onChange={e => this.setState({editedQuestion :e.target.value})}></input> <br/>
            <label>answer:</label>
            <input type="text" placeholder={card.answer} onChange={e => this.setState({editedAnswer :e.target.value})}></input> <br/>
            <input type="submit" value="save"></input>
          </form>
      </div>
    );
  }

  render(){
    const readCardsResult = this.props.cardsArr.map((card) => {return this.displayCardDiv(card)});  

    const editCardsResult = this.props.cardsArr.map((card) => {
      if (card.question === this.state.selectedQuestion.slice(10)){
        return this.displayFormDiv(card, 'edit');
      }else {
        return this.displayCardDiv(card);
      }
    });

    const createCardResult = this.displayFormDiv({
      id: this.props.cardsArr[this.props.cardsArr.length-1].id + 1,
      question: '',
      answer: ''
    }, 'create');

    return (
      <div className="listDiv">
        {this.state.readMode && readCardsResult}
        {this.state.editMode && editCardsResult}
        {createCardResult}
      </div>
      );
  
  }
}

export default CardsManager;
