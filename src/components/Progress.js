import React from 'react';
import '../index.css';

class Progress extends React.Component {
  state = {firstAmount: '',currentAmount: ''};

  componentDidMount = () => {
    this.setState({firstAmount: this.props.cardsArr.length});
  }

  componentWillReceiveProps(nextProps){
    if (this.state.firstAmount === this.props.questionsCounter){
      this.props.updateOnComplete();
    }
    this.setState({
      currentAmount : nextProps.questionsCounter
    });
  }

  render(){
    return (
      <>
      <p>Completed Questions:</p>
      <div className="progressBar">
        <div className="progressBarFull" style={{height:`${(this.state.currentAmount / this.state.firstAmount) * 100}%`}}></div>
      </div>
      </>
      );
  }
}

export default Progress;


