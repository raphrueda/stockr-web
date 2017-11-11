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

  /*
    Handler for adding funds to your balance
  */
  handleAdd() {
    let amount = this.refs['balance-input'].value;
    //TODO: More data validation if theres time to spare
    if (amount === "") {
      return;
    } else {
      this.props.addHandle(amount);
    }
  }

  /*
    Handler for taking funds to out of yourbalance
  */
  handleWith() {
    let amount = this.refs['balance-input'].value;
    //TODO: More data validation if theres time to spare
    if (amount === "") {
      return;
    } else {
      this.props.withHandle(amount);
    }
  }

  /*
    Renders the current balance (controlled by parent Container)
    and form for manipulating balance
  */
  render(){
    return(
      <div className="card balance-card">
        <div className="card-body">
          <h4 className="card-title">Balance</h4>
          <h5 className="card-subtitle text-muted">{"$" + this.props.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h5>
          <input type="number" min="0" className="form-control" ref={"balance-input"} placeholder="$ Amount" />
          <div className="balance-btns">
            <button type="button" className="btn btn-primary" onClick={this.handleAdd}>Add Funds</button>
            <button type="button" className="btn btn-success" onClick={this.handleWith}>Withdraw</button>
          </div>
        </div>
      </div>
    )
  }
}

//TODO: Prop validation if theres time to spare
Balance.propTypes = {

}

export default Balance;
