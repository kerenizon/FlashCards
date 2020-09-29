import React from 'react';
import '../index.css';

class CheckAnswer extends React.Component {

  onYesClickHandler = () => {
    this.props.onYesNoClick();
    //delete selected question
    this.props.onYesClick();
  }

  onNoClickHandler = () => {
    this.props.onYesNoClick();
  }

  render(){
    return (
      <>
        <h2>Did you get it right?</h2>
        <button onClick={this.onYesClickHandler} >Yes</button>
        <button onClick={this.onNoClickHandler}>No</button>
      </>
      );
  }
}

export default CheckAnswer;
