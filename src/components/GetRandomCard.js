import React from 'react';
import '../index.css';

class GetRandomCard extends React.Component{
  state = {chosenQuestion: ''};

  componentDidMount = () => {
    const randomIndex = Math.floor(Math.random() * this.props.cardsArr.length);
    console.log(this.props.cardsArr[randomIndex].question);
    const randomQuestion = this.props.cardsArr[randomIndex].question;
    this.setState({chosenQuestion: randomQuestion});
    this.props.chosenIndex(randomIndex);
    console.log(randomIndex);
  }
  
  render(){
    return(
      <>
        {this.state.chosenQuestion}
      </>
    );
  }
}

export default GetRandomCard;
