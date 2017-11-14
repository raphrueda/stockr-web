import React, {Component} from 'react';
import PortfolioEntry from './PortfolioEntry';

import PropTypes from 'prop-types';
import './style/Portfolio.css';

class Portfolio extends Component {
  constructor(props){
    super(props);

    this.state = {};
    this.state.portfolio = {};

    // Function binds
    this.handleSell = this.handleSell.bind(this);

    this.getPortfolioPosition = this.getPortfolioPosition.bind(this);
    this.renderPortfolioEntries = this.renderPortfolioEntries.bind(this);
    this.renderPortfolioHeader = this.renderPortfolioHeader.bind(this);
    this.renderPortfolioHeader = this.renderPortfolioHeader.bind(this);
    this.entryPriceChange = this.entryPriceChange.bind(this);
  }

  /*
    Propagates stock selling event to parent, Container from child, PortfolioEntry
  */
  handleSell(symbol, quantity, price) {
    this.props.transactionHandler('s', symbol, quantity, price);
  }

  renderPortfolioHeader() {
    return (
      <div className="card-header" role="tab">
        <div className="row header-row">
          <div className="col-md-3">
            <h6 className="mb-0">{"Symbol"}</h6>
          </div>
          <div className="col-md-3">
            <h6 className="mb-0">{"Qty."}</h6>
          </div>
          <div className="col">
            <h6 className="mb-0">{"Total"}</h6>
          </div>
        </div>
      </div>
    )
  }

  /*
    List of owned stocks
  */
  renderPortfolioEntries() {
    return Object.keys(this.props.portfolio).map((sym) =>
      <PortfolioEntry
        key={sym}
        date={this.props.date}
        symbol={sym}
        quantity={this.props.portfolio[sym].quantity}
        sellHandler={this.handleSell}
        priceChangeHandler={this.entryPriceChange}/>
    )
  }

  /*
    Somewhat hacky way of tracking the owned stock position
    NOTE See writeup for reflection/evaluation
  */
  getPortfolioPosition(){
    let total = 0;
    Object.keys(this.props.portfolio).forEach((sym) => {
      total += (parseFloat(this.props.portfolio[sym].price) * parseInt(this.props.portfolio[sym].quantity))
    });

    return(
      <h5 className="card-subtitle text-muted">{
          "$" + total.toLocaleString(undefined, {minimumFractionDigits: 2})
      }</h5>
    )
  }

  entryPriceChange(symbol, newPrice){
    this.props.portfolio[symbol].price = newPrice;
    this.forceUpdate();
  }

  /*
    Renders the portfolio position (total stock worth),
    stocks owned and controls to sell them
  */
  render() {
    return(
      <div className="card portfolio-card">
        <div className="card-body">
          <h4 className="card-title portfolio-title">Portfolio</h4>
          {this.getPortfolioPosition()}
        </div>
        <div className="card portfolio-entry">
          <div id="portfolio-accordion" role="tablist">
            {this.renderPortfolioHeader()}
            {this.renderPortfolioEntries()}
          </div>
        </div>
      </div>
    )
  }
}

//TODO: Prop validation if theres time to spare
Portfolio.propTypes = {

}

export default Portfolio;
