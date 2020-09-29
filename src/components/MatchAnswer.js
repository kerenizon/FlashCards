import React from 'react';
import '../index.css';

function MatchAnswer(props){
  const chosenAnswer = props.cardsArr.filter((card,index) => {
    if(index === props.chosenIndex)
      return card;
  });
  if (chosenAnswer.length === 0){
     return 'Loading';
  }else{
     console.log(chosenAnswer[0].answer);
    return (chosenAnswer[0].answer);
  }  
}

export default MatchAnswer;
