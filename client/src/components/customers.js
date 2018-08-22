import React, { Component } from 'react';
import './customers.css';
import axios from 'axios';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: null,
      firstnameVal : '',
      lastnameVal : ''
    };
    this.addCustomer = this.addCustomer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    fetch('/api/customers')
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(customers => this.setState({customers}));
  }
  addCustomer(){
    axios.post('/api/customers', {
      "firstname": this.state.firstnameVal,
      "lastname": this.state.lastnameVal
    })
    .then(result => {
      const updatedCustomers = this.state.customers.concat(result.data.createdUser);
      this.setState({
        customers: updatedCustomers,
        firstnameVal: '',
        lastnameVal: ''
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  handleChange(e){
    let value = e.target.value;
    if(e.target.id === 'firstname'){
      this.setState({
        firstnameVal : value
      });
    }else{
      this.setState({
        lastnameVal: value
      });
    }
  }
  handleDelete(e){
    let id= e.target.parentNode.id;
    axios({
      method : 'delete',
      url : `/api/customers/${id}`
    })
    .then(result => {
      let index;
      let updatedCustomers = this.state.customers;
      for(let i = 0; i<this.state.customers.length; i++){
        if(this.state.customers[i]._id === id){
          index = i;
        }
      }
      updatedCustomers.splice(index, 1);
      this.setState({
        customers : updatedCustomers
      });
    })
    .catch( err => {
      console.log(err);
    });
  }
  render() {
    return (
      <div id='customersComp'>
        <h2 id='title'>Customers</h2>
        <div id='edit'>
          <input type='input' id='firstname' placeholder='First Name' value={this.state.firstnameVal} onChange={this.handleChange}/>
          <input type='input' id='lastname' placeholder='Last Name' value={this.state.lastnameVal} onChange={this.handleChange}/>
          <button type='button' id='addButton' onClick={this.addCustomer}>add customer</button>
        </div>
        <div id='content'>
          {
            this.state.customers ? 
              <ul>
              {
                this.state.customers.map(customer => 
                <li key={customer._id} id={customer._id}> <span>{customer.firstname} {customer.lastname}</span> <button className='deleteButton' type='button' onClick={this.handleDelete}>x</button> </li>)
              }
              </ul>
            : <p id='loading'>LOADING...</p>
          }
        </div>
      </div >
    );
  }
}

export default Customers;
