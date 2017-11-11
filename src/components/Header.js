import React, {Component} from 'react';
import './style/Header.css';

class Header extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">Stockr</a>
      </nav>
    )
  }
}

export default Header;
