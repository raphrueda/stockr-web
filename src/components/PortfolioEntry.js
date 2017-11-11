import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style/PortfolioEntry.css';

const avKey = "6ILEM2PUZ7E46HYA";

class PortfolioEntry extends Component {
  constructor(props){
    super(props);

    this.state = {};

    // Function binds
    this.handleSell = this.handleSell.bind(this);
  }

  handleSell(e) {
    e.preventDefault();
    let quantity = this.refs["quanPort-"+this.props.symbol].value;
    if (quantity === "") {
      return;
    } else if (quantity < 0) {
      alert("Enter a positive quantity");
      return;
    } else if (quantity % 1 !== 0) {
      alert("Non-integer detected");
      return;
    } else {
      this.props.sellHandler(this.props.symbol, quantity, this.state.pricePer);
    }
  }

  fetchPrice() {
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
          pricePer: parseFloat(data["Time Series (Daily)"][date]["4. close"]),
          requestFailed: false
        });
      })
      .catch(err => {
        this.setState({
          requestFailed: true
        });
      })
  }

  reloadEntry() {
    this.fetchPrice();
  }

  componentDidMount() {
    this.fetchPrice();
  }


  render(){
    if (this.state.requestFailed) return (
      <div key={this.props.symbol}>
        <div className="card-header" role="tab">
          <div className="row">

            <div className="col-sm-2">
              <h6 className="mb-0">{this.props.symbol}</h6>
            </div>

            <div className="col-sm-2">
              <h6 className="mb-0">{this.props.quantity}</h6>
            </div>

            <div className="col">
              <h6 className="mb-0">{"Load failed"}</h6>
            </div>

            <div className="col-sm-3">
              <button type="button" className="btn .btn-warning" onClick={this.reloadEntry}>Retry</button>
            </div>

          </div>
        </div>
      </div>
    )
    return(
      <div key={this.props.symbol}>
        <div className="card-header" role="tab">
          <div className="row">

            <div className="col-sm-2">
              <h6 className="mb-0">{this.props.symbol}</h6>
            </div>

            <div className="col-sm-2">
              <h6 className="mb-0">{this.props.quantity}</h6>
            </div>

            <div className="col-sm-2">
              <h6 className="mb-0">{
                (this.state.pricePer) ?
                  "$" + (this.state.pricePer).toLocaleString(undefined, {minimumFractionDigits: 2})
                  : "Loading..."
              }</h6>
            </div>

            <div className="col-sm-3">
              <h6 className="mb-0">{
                (this.state.pricePer) ?
                  "$" + (this.state.pricePer * this.props.quantity).toLocaleString(undefined, {minimumFractionDigits: 2})
                  : "Loading..."
              }</h6>
            </div>

            <div className="col-sm-3">
              <button type="button" className="btn btn-primary" data-toggle="collapse" href={"#"+this.props.symbol + "-port"} aria-expanded="true" aria-controls={this.props.symbol + "-port"}>Expand</button>
            </div>

          </div>
        </div>
        <div id={this.props.symbol + "-port"} className="collapse" role="tabpanel" data-parent="#port-accordion">
          <div className="card-body">
            <form className="form-inline portfolio-form">
              <div className="form-group mx-sm-3">
                <input type="number" min="0" step="1" className="form-control" ref={"quanPort-"+this.props.symbol} placeholder="Quantity" />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.handleSell}>SELL</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PortfolioEntry.propTypes = {

}

export default PortfolioEntry;
