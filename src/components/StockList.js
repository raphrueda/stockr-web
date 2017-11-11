import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StockEntry from './StockEntry';

import './style/StockList.css';

const nasdaqList = require('./static/nasdaq-list').NasdaqListCompact;

class StockList extends Component {
  constructor(props){
    super(props);

    this.state = {};

    // Function binds
    this.renderStockEntries = this.renderStockEntries.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

  formatDate(date) {
    let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return formattedDate;
  }

  handleBuy(symbol, quantity, price) {
    this.props.transactionHandler('b', symbol, quantity, price);
  }

  componentDidMount() {
    //NOTE: This would be replaced with an actual api call to a live list of companies
    this.setState({
      date: this.formatDate(new Date("2017-11-10")),
      symbolList : nasdaqList
    });
  }

  renderStockEntries () {
    if (this.state.symbolList && this.state.date) {
      return Object.keys(this.state.symbolList).map((sym) =>
        <StockEntry
          key={sym}
          symbol={sym}
          fname={this.state.symbolList[sym]}
          date={this.state.date}
          buyHandler={this.handleBuy}/>
      )
    }
  }

  render(){
    return(
      <div className="card stock-card">
        <div className="card-body">
          <h4 className="card-title stock-title">Stock List</h4>
        </div>
        <div className="card stock-entry">
          <div id="stock-accordion" role="tablist">
            <div className="card-header" role="tab">
              <div className="row header-row">
                <div className="col-md-2">
                  <h6 className="mb-0">{"Symbol"}</h6>
                </div>
                <div className="col-md-4">
                  <h6 className="mb-0">{"Company"}</h6>
                </div>
                <div className="col-md-2">
                  <h6 className="mb-0">{"Price (Close)"}</h6>
                </div>
                <div className="col-md-2">
                  <h6 className="mb-0">{"Volume"}</h6>
                </div>
              </div>
            </div>
            {this.renderStockEntries()}
          </div>
        </div>
      </div>
    )
  }
}

StockList.propTypes = {

}

export default StockList;
