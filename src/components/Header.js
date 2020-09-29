import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render(){
    return (
      <div className="Header">
        <Link to="/">Home</Link>
        <Link to="/flashCards">Flash Cards</Link>
        <Link to="/cardsManager">Manage Cards</Link>
      </div>
      );
  }
}

export default Header;
