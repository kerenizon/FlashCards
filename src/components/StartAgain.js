import React from 'react';
import '../index.css';

class StartAgain extends React.Component {

  onClickHandler = () => {
    this.props.onStartClick();
  }

  render(){
    return (
      <div className="startAgain">
        <p>You have completed all flash cards!</p>
        <button onClick={this.onClickHandler}>restart again</button>
      </div>
      );
  }
}

export default StartAgain;
