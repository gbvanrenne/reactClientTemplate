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

  _setCustomer = params => {
    
    var customerInfo = {}
    
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        (params[key] == null) ? customerInfo[key] = "" : customerInfo[key] = params[key]
      }
    }
    this.setState({customer: customerInfo})
  }

  _updateCustomer = params => {
    
    console.log("Main._updateSelectedCustomer. Params: " + params)
  }

  _setROstate = state => {
    this.setState({readOnlyMode: state})
  }

  render() { 
    return (
      <div>
        <SearchBar 
          setCustomer_callback={this._setCustomer.bind(this)}
        />
        
        <CustomerInfoForm
          readOnlyMode={this.state.readOnlyMode} 
          setROmode_callback={this._setROstate.bind(this)}
          setCustomer_callback={this._setCustomer.bind(this)}
          updateCustomer_callback={this._updateCustomer.bind(this)}
          customer={this.state.customer}
        />

        <code><ul>
          <li>BUG: add credits, edit mode, manually change balance, exit edit mode, deduct</li>
        </ul></code>
        <ProductRefill
          productType="18 Litre"
          readOnlyMode={this.state.readOnlyMode}
          updateCustomer_callback={this._updateCustomer.bind(this)}
          customer={this.state.customer.id}
        />

        <ProductRefill
          productType="11 Litre"
          readOnlyMode={this.state.readOnlyMode}
          updateCustomer_callback={this._updateCustomer.bind(this)}
          customer={this.state.customer.id}
        />

        <ProductRefill
          productType="1 Litre"
          readOnlyMode={this.state.readOnlyMode}
          updateCustomer_callback={this._updateCustomer.bind(this)}
          customer={this.state.customer.id}
        />

      </div>
    )
  }
}

export default Main