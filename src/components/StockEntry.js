import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style/StockEntry.css';

const fs = require('fs');
const ini = require('ini');
// const conf = ini.parse(fs.readFileSync('../config.ini', 'utf-8'));  //TODO: find out why this is not working
// const avKey = conf.alphavantage.token;

const avKey = "6ILEM2PUZ7E46HYA";

class StockEntry extends Component {
  constructor(props){
    super(props);

    this.state = {};
    // Function binds
    this.reloadEntry = this.reloadEntry.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

  reloadEntry() {
    this.fetchStockData();
  }

  fetchStockData() {
    let url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.props.symbol + "&apikey=" + avKey;
    let date = this.props.date;
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error("Network request failed");
        }
        return res;
      })
      .then(data => data.json())
      .then(data => {
        if (data["Time Series (Daily)"][date] === undefined) {
          throw Error("Network request failed");
        }
        this.setState({
          stockData: data["Time Series (Daily)"][date],
          requestFailed: false
        });
      }, () => {
        this.setState({
          requestFailed: true
        });
      })
      .catch(err => {
        this.setState({
          requestFailed: true
        });
      })
  }

  handleBuy(e) {
    e.preventDefault();
    let quantity = this.refs["quantity-"+this.props.symbol].value;
    let price = this.state.stockData["4. close"];
    if (quantity === "") {
      return;
    } else if (quantity % 1 !== 0) {
      alert("Non-integer detected");
      return;
    } else {
      this.props.buyHandler(this.props.symbol, quantity, price);
    }
  }

  componentDidMount() {
    this.fetchStockData();
  }

  render(){
    if (this.state.requestFailed) {
      this.reloadEntry();
      return <p className="mb-0">Loading...</p>
    }
    if (!this.state.stockData) {
      return <p className="mb-0">Loading...</p>
    }
    return(
      <div key={this.props.symbol}>
        <div className="card-header" role="tab">
          <div className="row">
            <div className="col-md-2">
              <h6 className="mb-0">{this.props.symbol}</h6>
            </div>
            <div className="col-md-4">
              <h6 className="mb-0">{this.props.fname}</h6>
            </div>
            <div className="col-md-2">
              <h6 className="mb-0">{"$"+parseFloat(this.state.stockData["4. close"]).toLocaleString(undefined, {minimumFractionDigits: 2})}</h6>
            </div>
            <div className="col-md-2">
              <h6 className="mb-0">{this.state.stockData["5. volume"]}</h6>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-primary" data-toggle="collapse" href={"#"+this.props.symbol} aria-expanded="true" aria-controls={this.props.symbol}>Expand</button>
            </div>
          </div>
        </div>
        <div id={this.props.symbol} className="collapse" role="tabpanel" data-parent="#stock-accordion">
          <div className="card-body">
            <form className="form-inline">
              <div className="form-group mx-sm-3">
                <input type="number" min="0" className="form-control" ref={"quantity-"+this.props.symbol} placeholder="Quantity" />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.handleBuy}>BUY</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

StockEntry.propTypes = {

}

export default StockEntry;
