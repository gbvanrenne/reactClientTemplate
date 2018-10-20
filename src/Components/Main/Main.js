import React, {Component} from 'react'
import SearchBar from './SearchBar'
import CustomerInfoForm from './CustomerInfoForm'
import ProductRefill from './ProductRefill'
import Button from '../Common/HTML/Button'
import objIsEmpty from '../../Utils/objUtils' 

class Main extends Component {
  state = {
    readOnlyMode: true,
    customer: {
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      email: "",
      balance_18L: 0,
      balance_11L: 0,
      balance_1L: 0,
    },
    customerEdits: {},
  }

  _setCustomer = params => {
    
    var customerInfo = {}
    
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        (params[key] == null) ? 
          customerInfo[key] = '' : 
          customerInfo[key] = params[key]
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
        {process.env.DB_SERVER}

        <SearchBar 
          setCustomer_callback={this._setCustomer.bind(this)}
          disabled={this.state.readOnlyMode}
        />
        
        <CustomerInfoForm
          readOnlyMode={this.state.readOnlyMode} 
          customer={this.state.customer}
          inputChange_cb={this._handleInputChange.bind(this)}
        />

        {/* new customer button*/}
        { this.state.readOnlyMode === true &&
        <Button 
          parentClass   ={'CustomerInfo'}
          name          ={'newCustomer'}
          title         ={'Add New'}
          action        ={this._handleButtonEvent}
        />
        }

        {/* delete customer button*/}
        { this.state.readOnlyMode === true && this.state.customer.id !== "" &&
        <Button 
          parentClass   ={'CustomerInfo'}
          name          ={'deleteCustomer'}
          title         ={'Delete'}
          action        ={this._handleButtonEvent}
        />
        }

        {/* edit customer button*/}
        {/* Show the edit button in read only mode when a user has been selected */}
        { this.state.readOnlyMode === true && this.state.customer.id !== "" &&
        <Button 
          parentClass   ={'CustomerInfo'}
          name          ={'editCustomer'}
          title         ={'Edit'}
          action        ={this._handleButtonEvent}
        />
        }

        { (this.state.readOnlyMode === false) &&
          /* cancel changes button*/
        <Button 
          parentClass   ={'CustomerInfo'}
          name          ={'cancelChanges'}
          title         ={'Cancel'}
          action        ={this._handleButtonEvent}
        />
        }                

        {/* save changes button*/}
        { (this.state.readOnlyMode === false && this._recordHasUnsavedEdits()) &&
        <Button 
          parentClass   ={'CustomerInfo'}
          name          ={'saveChanges'}
          title         ={'Save'}
          action        ={this._handleButtonEvent}
        />
        }

        <ProductRefill
          productType="18 Litre"
          readOnlyMode={this.state.readOnlyMode}
          updateCustomer_callback={this._updateCustomer.bind(this)}
          balanceName={'balance_18L'}
          balance={this.state.customer.balance_18L}
          customer={this.state.customer.id}
          inputChange_cb={this._handleInputChange.bind(this)}
          />

        <ProductRefill
          productType="11 Litre"
          readOnlyMode={this.state.readOnlyMode}
          updateCustomer_callback={this._updateCustomer.bind(this)}
          balanceName={'balance_11L'}
          balance={this.state.customer.balance_11L}
          customer={this.state.customer.id}
          inputChange_cb={this._handleInputChange.bind(this)}
        />

        <ProductRefill
          productType="1 Litre"
          readOnlyMode={this.state.readOnlyMode}
          updateCustomer_callback={this._updateCustomer.bind(this)}
          balanceName={'balance_1L'}
          balance={this.state.customer.balance_1L}
          customer={this.state.customer.id}
          inputChange_cb={this._handleInputChange.bind(this)}
        />

      </div>
    )
  }

  _recordHasUnsavedEdits = () => {
    return (! objIsEmpty(this.state.customerEdits))
  }

  _handleInputChange = (e) => {
    let value = e.target.value
    let name  = e.target.name

    this.setState( prevState => ({ 
      customerEdits: {
        ...prevState.customerEdits, 
        [name]: value 
      }
    }))
  }
  
  _handleButtonEvent = (e) => {
    // button event handling logic
    e.preventDefault()

    switch (e.target.name) {

      case 'newCustomer':
        console.log(e.target.name + " button clicked")          
        break;

      case 'deleteCustomer':
        console.log(e.target.name + " button clicked")          
        break;

      case 'editCustomer':

        if(this.state.customer.id) {
          this.setState({
            readOnlyMode: ! this.state.readOnlyMode,
          })
        }
        else{
          alert("First find and select a customer")
        }
        break;

      case 'saveChanges':
        console.log(e.target.name + " button clicked")          

        // call API to update user information

        // then update customer state info, replacing values in customer 
        // object with updated values from customerEdits object
        this.setState({ 
          customer: {
            ...this.state.customer, 
            ...this.state.customerEdits
          },
          customerEdits: {},
          readOnlyMode: ! this.readOnlyMode
        })
    
        break;

      case 'cancelChanges':
        // reset customer edit state variable to an empty object
        this.setState({
          customerEdits: {},
          readOnlyMode: ! this.state.readOnlyMode,
        })

        break;

      default:
        break;
    }
  }

  _handleCheckBoxEvent(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.checkboxOption.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.checkboxOption.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.checkboxOption, newSelection];
    }

      this.setState( prevState => ({ user:
        {...prevState.user, checkboxOption: newSelectionArray }
      })
      )
  }

  _handleFormSubmit = () => {
    // form submission logic
    console.log("_handleFormSubmit")
  }

  _handleFormClear = () => {
    // form reset logic
    console.log("_handleFormClear")
  }

}



export default Main