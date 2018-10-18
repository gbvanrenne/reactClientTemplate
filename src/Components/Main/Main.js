import React, {Component} from 'react'
import SearchBar from './SearchBar'
import CustomerInfoForm from './CustomerInfoForm'
import ProductRefill from './ProductRefill'

class Main extends Component {
  state = {
    readOnlyMode: true,
    customer: {
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      phone: '',
      email: '',
    }
  }

  _setSelectedCustomer = params => {
    
    var customerInfo = {}
    
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        (params[key] == null) ? customerInfo[key] = "" : customerInfo[key] = params[key]
      }
    }
    this.setState({customer: customerInfo})
  }

  _setROstate = state => {
    this.setState({readOnlyMode: state})
  }

  render() { 
    return (
      <div>
        <SearchBar 
          setSelectedCustomer_callback={this._setSelectedCustomer.bind(this)}
        />
        
        {/* <h2>Customer Info</h2> */}
        
        <CustomerInfoForm
          readOnlyMode={this.state.readOnlyMode} 
          setROmode_callback={this._setROstate.bind(this)}
          customer={this.state.customer}
        />

        <ProductRefill
          productType="18 Litre"
          readOnlyMode={this.state.readOnlyMode}
          customer={this.state.customer.id}
        />

        <ProductRefill
          productType="11 Litre"
          readOnlyMode={this.state.readOnlyMode}
          customer={this.state.customer.id}
        />

        <ProductRefill
          productType="1 Litre"
          readOnlyMode={this.state.readOnlyMode}
          customer={this.state.customer.id}
        />

      </div>
    )
  }
}

export default Main