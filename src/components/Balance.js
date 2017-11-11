import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style/Balance.css';

class Balance extends Component {
  constructor(props){
    super(props);

    this.state = {};

    // Function binds
    this.handleAdd = this.handleAdd.bind(this);
    this.handleWith = this.handleWith.bind(this);
  }

  handleAdd() {
    let amount = this.refs['balance-input'].value;
    if (amount === "") {
      return;
    } else {
      this.props.addHandle(amount);
    }
  }

  handleWith() {
    let amount = this.refs['balance-input'].value;
    if (amount === "") {
      return;
    } else {
      this.props.withHandle(amount);
    }
  }

  render(){
    return(
      <div className="card balance-card">
        <div className="card-body">
          <h4 className="card-title">Balance</h4>
          <h5 className="card-subtitle text-muted">{"$" + this.props.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h5>
          <form className="form-inline balance-form">
            <div className="form-group mx-sm-3">
              <input type="number" min="0" className="form-control" ref={"balance-input"} placeholder="$ Amount" />
            </div>
            <div className="dropdown-divider"></div>
            <div className="balance-btns">
              <button type="button" className="btn btn-primary" onClick={this.handleAdd}>Add Funds</button>
              <button type="button" className="btn btn-success" onClick={this.handleWith}>Withdraw</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Balance.propTypes = {

}

export default Balance;
