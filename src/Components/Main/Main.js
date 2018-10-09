import React, {Component} from 'react'
import SearchBar from '../Common/SearchBar'
import CustomerInfoForm from './CustomerInfoForm'

class Main extends Component {

  render() {
    return (
      <div>
        <h1>Customer Refill Manager</h1>
        <SearchBar />
        <h2>Customer Info</h2>
        <CustomerInfoForm />
        <h3>18 Litre</h3>
        <h3>11 Litre</h3>
        <h3>1 Litre</h3>
      </div>
    )
  }
}

export default Main