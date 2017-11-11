import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style/Header.css';

class Header extends Component {
  constructor(props){
    super(props);
    // Function binds
  }

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">Stockr</a>
      </nav>
    )
  }
}

Header.propTypes = {

}

export default Header;
