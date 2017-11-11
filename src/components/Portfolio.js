import React, {Component} from 'react';
import PortfolioEntry from './PortfolioEntry';

import PropTypes from 'prop-types';
import './style/Portfolio.css';

const avKey = "6ILEM2PUZ7E46HYA";

class Portfolio extends Component {
  constructor(props){
    super(props);

    this.state = {};
    this.state.position = 0;
    this.state.portfolio = {};

    // Function binds
    this.handleSell = this.handleSell.bind(this);

    this.getPortfolioPosition = this.getPortfolioPosition.bind(this);
    this.renderPortfolioEntries = this.renderPortfolioEntries.bind(this);
    this.renderPortfolioHeader = this.renderPortfolioHeader.bind(this);
    this.renderPortfolioHeader = this.renderPortfolioHeader.bind(this);
  }

  handleSell(symbol, quantity, price) {
    this.props.transactionHandler('s', symbol, quantity, price);
  }

  renderPortfolioHeader() {
    return (
      <div className="card-header" role="tab">
        <div className="row header-row">
          <div className="col-md-2">
            <h6 className="mb-0">{"Symbol"}</h6>
          </div>
          <div className="col-md-2">
            <h6 className="mb-0">{"Qty."}</h6>
          </div>
          <div className="col-2">
            <h6 className="mb-0">{"Value"}</h6>
          </div>
          <div className="col">
            <h6 className="mb-0">{"Total"}</h6>
          </div>
        </div>
      </div>
    )
  }

  renderPortfolioEntries() {
    console.log(this);
    return Object.keys(this.props.portfolio).map((sym) =>
      <PortfolioEntry
        key={sym}
        date={this.props.date}
        symbol={sym}
        quantity={this.props.portfolio[sym].quantity}
        sellHandler={this.handleSell}/>
    )
  }

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

Portfolio.propTypes = {

}

export default Portfolio;
