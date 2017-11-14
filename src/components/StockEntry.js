import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style/StockEntry.css';

const fs = require('fs');
const ini = require('ini');
// const conf = ini.parse(fs.readFileSync('../config.ini', 'utf-8'));  //TODO: find out why this is not working
// const avKey = conf.alphavantage.token;

const MAX_CALLS = 2;

const avKey = "6ILEM2PUZ7E46HYA";

class StockEntry extends Component {
  constructor(props){
    super(props);

    this.calls = MAX_CALLS;
    this.state = {};
    // Function binds
    this.reloadEntry = this.reloadEntry.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.fetchStockData = this.fetchStockData.bind(this);
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

  /*
    Call to Alphavantage for stock prices
  */
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
        this.calls = MAX_CALLS;
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

  /*
    Called when API call initally fails
  */
  reloadEntry() {
    if (this.calls > 0) {
      this.calls --;
      this.fetchStockData();
    }
  }

  componentDidMount() {
    this.fetchStockData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date != nextProps.date) {
      delete this.state.stockData;
      this.reloadEntry();
    }
  }

  render(){
    if (this.calls == 0) {
      return(
        <div className="card-header" role="tab">
          <div className="row">
            <div className="col-md-2">
              <h6 className="mb-0">{this.props.symbol}</h6>
            </div>
            <div className="col-md-8">
              <h6 className="mb-0">{"Fail limit reached."}</h6>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-danger btn-sm" onClick={this.fetchStockData}>Retry</button>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.requestFailed) {
      this.reloadEntry();
      return <p className="mb-0">Failed...</p>
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
              <button type="button" className="btn btn-primary btn-sm" data-toggle="collapse" href={"#"+this.props.symbol} aria-expanded="true" aria-controls={this.props.symbol}>Expand</button>
            </div>
          </div>
        </div>
        <div id={this.props.symbol} className="collapse" role="tabpanel" data-parent="#stock-accordion">
          <div className="card-body">
            <form className="form-inline">
              <div className="form-group mx-sm-3">
                <input type="number" min="0" className="form-control" ref={"quantity-"+this.props.symbol} placeholder="Quantity" />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" onClick={this.handleBuy}>BUY</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

//TODO: Prop validation if theres time to spare
StockEntry.propTypes = {

}

export default StockEntry;
