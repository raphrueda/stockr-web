import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Balance from './Balance';
import Portfolio from './Portfolio';
import StockList from './StockList';

import './style/Container.css';

class Container extends Component {
  constructor(props){
    super(props);

    this.state = {};
    this.state.balance = 0;
    this.state.portfolio = {};

    //Default to yesterday's date, as a quickfix for interacting with Alphavantage's api (timezones)
    let today = new Date();
    today.setDate(today.getDate() - 1);
    this.state.date = this.formatDate(today)

    // Function binds
    this.onAddFunds = this.onAddFunds.bind(this);
    this.onWithFunds = this.onWithFunds.bind(this);
    this.handleTransaction = this.handleTransaction.bind(this);
  }

  /*
    Handles the propagated deposit/add event from the Balance component
  */
  onAddFunds(amount) {
    if (parseFloat(amount) < 0) {
      alert("Please enter in a positive amount.");
    } else {
      let newBalance = this.state.balance + parseFloat(amount);
      this.setState({
        balance : newBalance
      });
    }
  }

  /*
    Handles the propagated withdrawl event from the Balance component
  */
  onWithFunds(amount) {
    if (parseFloat(amount) < 0) {
      alert("Please enter in a positive amount.");
    } else if (this.state.balance < amount) {
      alert("You do not have enough funds.");
    } else {
      let newBalance = this.state.balance - parseFloat(amount);
      this.setState({
        balance : newBalance
      });
    }
  }

  /*
    Handles transactions propagated up from the PortfolioEntry and StockEntry components
    Light validation on values, e.g. over-withdrawling, over-selling, etc.
    Updates state to propagate changes back to components
  */
  handleTransaction(type, symbol, quantity, price) {
    if (type === 'b') {

      if (this.state.balance < price * quantity) {
        alert("You do not have enough funds.");
      } else {
        let newBalance = this.state.balance - (price * quantity);
        let newPortfolio = this.state.portfolio;
        if (!newPortfolio[symbol]) newPortfolio[symbol] = {};
        let newQuan =   parseInt(newPortfolio[symbol].quantity) + parseInt(quantity);
        if (newPortfolio[symbol].quantity) {
          newPortfolio[symbol].quantity = parseInt(newPortfolio[symbol].quantity) + parseInt(quantity);
        } else {
          newPortfolio[symbol].quantity = quantity;
        }
        newPortfolio[symbol].price = parseFloat(price);
        this.setState({
          balance : newBalance,
          portfolio : newPortfolio
        });
      }
    } else {
      if (parseInt(this.state.portfolio[symbol].quantity) < parseInt(quantity)) {
        alert("You do not have enough stocks");
      } else {
        let newBalance = this.state.balance + (price * parseInt(quantity));
        let newPortfolio = this.state.portfolio;
        newPortfolio[symbol].quantity = parseInt(newPortfolio[symbol].quantity) - parseInt(quantity);
        if (newPortfolio[symbol].quantity === 0)
          delete newPortfolio[symbol];
        this.setState({
          balance : newBalance,
          portfolio : newPortfolio
        });
      }
    }
  }

  /*
    Converts date to format suitable for Alphavantage API
  */
  formatDate(date) {
    let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return formattedDate;
  }

  componentDidMount() {



  }

  render(){
    return(
      <div className="container-fluid">
        <Header />
        <div className="row module-row">
          <div className="col-sm-12 col-lg-7 offset-lg-2 module-wrapper">
            <div className="row">
              <div className="col-sm-12 col-lg-4 left-modules">
                <Balance balance={this.state.balance} addHandle={this.onAddFunds} withHandle={this.onWithFunds}/>
                <Portfolio date={this.state.date} transactionHandler={this.handleTransaction} portfolio={this.state.portfolio}/>
              </div>
              <div className="col-sm-12 col-lg-8 right-modules">
                <StockList date={this.state.date} transactionHandler={this.handleTransaction} date = {this.state.date}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//TODO: Prop validation if theres time to spare
Container.propTypes = {

}

export default Container;
