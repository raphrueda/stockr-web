import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StockEntry from './StockEntry';

import './style/StockList.css';

// TODO: Find an api for listing nasdaq companies
// and use instead of the following file.
const nasdaqList = require('./static/nasdaq-list').NasdaqListCompact;

class StockList extends Component {
  constructor(props){
    super(props);

    this.state = {};

    // Function binds
    this.renderStockEntries = this.renderStockEntries.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.nextDay = this.nextDay.bind(this);
  }


  handleBuy(symbol, quantity, price) {
    this.props.transactionHandler('b', symbol, quantity, price);
  }

  componentDidMount() {
    //NOTE: This would be replaced with an actual api call to a live list of companies
    this.setState({
      symbolList : nasdaqList
    });
  }

  renderStockEntries () {
    if (this.state.symbolList) {
      return Object.keys(this.state.symbolList).map((sym) =>
        <StockEntry
          key={sym}
          symbol={sym}
          fname={this.state.symbolList[sym]}
          date={this.props.date}
          buyHandler={this.handleBuy}/>
      )
    }
  }

  prevDay() {
    this.props.dateHandler(-1);
  }

  nextDay() {
    this.props.dateHandler(1);
  }

  /*
    Renders the list of stocks (compact list)
  */
  render(){
    return(
      <div className="card stock-card">
        <div className="card-body">
          <h4 className="card-title stock-title">Stock List</h4>
          <h5 className="card-subtitle text-muted list-date">
            <button className="btn btn-sm" onClick={this.prevDay}>&laquo;</button>
            {this.props.date}
            <button className="btn btn-sm" onClick={this.nextDay}>&raquo;</button>
          </h5>
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

//TODO: Prop validation if theres time to spare
StockList.propTypes = {

}

export default StockList;
