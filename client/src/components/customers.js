import React, { Component } from 'react';
import './customers.css';
import axios from 'axios';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: null,
      inputVal : ''
    };
    this.addCustomer = this.addCustomer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    fetch('/api/customers')
      .then(res => {
        return res.json();
      })
      .then(customers => this.setState({customers}));
  }

  addCustomer(){
    axios.post('/api/customers', {
      "firstname": "houda",
      "lastname": "slamani"
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({
      inputVal : value
    });
  }
  render() {
    return (
      <div>
        <h2>Customers</h2>
        <button type='button' onClick={this.addCustomer}>add customer</button>
        <input type='input' value={this.state.inputVal} onChange={this.handleChange}/>
        {this.state.customers && <ul>
        {this.state.customers.map(customer => 
          <li key={customer._id}>{customer.firstname} {customer.lastname}</li>
        )}
        </ul>}
      </div>
    );
  }
}

export default Customers;
