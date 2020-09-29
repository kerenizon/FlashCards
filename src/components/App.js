import React from 'react';
import '../App.css';
import '../index.css';
import Homepage from './Homepage';
import FlashCards from './FlashCards';
import CardsManager from './CardsManager';
import Header from './Header';
import mockapi from '../api/mockapi';
import { BrowserRouter, Route } from 'react-router-dom'
  
class App extends React.Component {
  state = {cardsArr: []};

  async componentDidMount(){
    const response = await mockapi.get('/cards');
    this.setState({cardsArr: response.data});
  }

  updateDelete = (chosenIndex) => {
    const firstSlicedArr = this.state.cardsArr.slice(0, chosenIndex);
    const secondSlicedArr = this.state.cardsArr.slice(chosenIndex + 1);
    if (this.state.cardsArr.length === 1){
      this.componentDidMount();
    } else {
      this.setState({cardsArr: [...firstSlicedArr, ...secondSlicedArr]});
    }
  }

  actionHandler = (selectedQuestion, mode, editedItem = '') => {
    console.log(selectedQuestion);
    console.log(editedItem);
    switch(mode){
      case 'create':
        this.onCreateMode(editedItem);
        break;
      case 'edit':
        this.onEditMode(selectedQuestion, editedItem);
        break;
      case 'delete':
        this.onDeleteMode(selectedQuestion);
        break;
    }
  }

  onCreateMode = async (createdItem) => {
    await mockapi.post('/cards', createdItem);
    const response = await mockapi.get('/cards');
    this.setState({cardsArr: response.data});
  }

  onEditMode = async (selectedQuestion, editedItem) => {
    const questionID = this.state.cardsArr.filter((card) => {
      if (card.question === selectedQuestion.slice(10))
        return card;
    });
    console.log(questionID);
    await mockapi.put(`/cards/${questionID[0].id}`, editedItem);
    const response = await mockapi.get('/cards');
    this.setState({cardsArr: response.data});
  }

  onDeleteMode = async (selectedQuestion) => {
    const questionID = this.state.cardsArr.filter((card) => {
      if (card.question === selectedQuestion.slice(10))
        return card;
    });
    await mockapi.delete(`/cards/${questionID[0].id}`);
    const response = await mockapi.get('/cards');
    this.setState({cardsArr: response.data});
  }

  render(){
    console.log(this.state.cardsArr);
    if (this.state.cardsArr.length === 0) return 'Loading';
    else{
      return (
        <div>
          <BrowserRouter>
          <Header/>
          <div>
            <Route path="/" exact component={Homepage}/>
            <Route path="/flashCards" exact render={(props) => (<FlashCards {...props} cardsArr={this.state.cardsArr} updateDelete={this.updateDelete}/>)}/>
            <Route path="/cardsManager" exact render={(props) => (<CardsManager {...props} cardsArr={this.state.cardsArr} selectedQuestionAndMode = {this.actionHandler}/>)}/>
          </div>
          </BrowserRouter>
        </div>
        );
    }
    
  }
}

export default App;
