import React, {Component} from 'react'
import SearchBar from './SearchBar'
import CustomerInfoForm from './CustomerInfoForm'
import ProductRefill from './ProductRefill'
import Button from '../Common/HTML/Button'
import objIsEmpty from '../../Utils/objUtils' 
import DB_User_UPDATE from '../../DBqueries/DB_User_UPDATE'

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
      balance_01L: 0,
    },
    customerEdits: {},
    processingEdits: false, 
    shouldRefreshSearchList: false,
  }

  componentWillMount() {
    // Balances aren't guaranteed to be set for a user, so when mounting
    // this component, initialize the balance to 0
    if (objIsEmpty(this.state.customer)) {
      this.setState({
        customer: {
          balance_18L: 0,
          balance_11L: 0,
          balance_01L: 0,
        }
      })
    }
  }

  componentWillUpdate() {
    // Balances aren't guaranteed to be set for a user, so if the balances are
    // null or blank, set them to 0
    let balanceData = {}

    if (this.state.customer.balance_18L === "") balanceData.balance_18L = 0
    if (this.state.customer.balance_11L === "") balanceData.balance_11L = 0
    if (this.state.customer.balance_01L === "") balanceData.balance_01L = 0

    if (! objIsEmpty(balanceData)) {
      this.setState({
        customer: {
          ...this.state.customer,
          ...balanceData
        }
      })
    }
  }
  _setCustomer = params => { 
    
    var customerInfo = {}

    // Clear existing customer info
    this.setState({ 
      customer: {}
    })
    
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        (params[key] == null) ? 
          customerInfo[key] = '' : 
          customerInfo[key] = params[key]
      }
    }

    this.setState( prevState => ({ 
      customer: {
        ...this.state.customer, 
        ...customerInfo,
      }
    }))
  }

  _updateCustomer = params => {
    
    console.log("Main._updateSelectedCustomer. Params: " + params)
  }

  _setROstate = state => {
    this.setState({readOnlyMode: state})
  }

  _setRefreshSearchListFlag = state => {
    this.setState({shouldRefreshSearchList: state})
  }

  render() { 

    return (
      <div>

        <SearchBar 
          setCustomer_callback={this._setCustomer.bind(this)}
          disabled={this.state.readOnlyMode}
          refreshList={this.state.shouldRefreshSearchList}
          setRefreshListFlag={this._setRefreshSearchListFlag.bind(this)}
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

        <CustomerInfoForm
          readOnlyMode={this.state.readOnlyMode} 
          customer={this.state.customer}
          inputChange_cb={this._handleInputChange.bind(this)}
        />

        <code><ul>
          <li>Disable refillQty if customer isn't selected or edit mode is enabled</li>  
          <li>Changing the balance in edit mode should trigger enabling of save / cancel</li>  
          <li>After adding or deducting credits, refill qty field should be set to 0 or blank</li>  
        </ul></code>

        <ProductRefill
          productType="18 Litre"
          readOnlyMode={this.state.readOnlyMode}
          balanceName={'balance_18L'}
          balance={this.state.customer.balance_18L}
          balanceChange_cb={this._handleBalanceChange.bind(this)}
          customer={this.state.customer.id}
          processingEdits={this.state.processingEdits}
          />

        <ProductRefill
          productType="11 Litre"
          readOnlyMode={this.state.readOnlyMode}
          balanceName={'balance_11L'}
          balance={this.state.customer.balance_11L}
          balanceChange_cb={this._handleBalanceChange.bind(this)}
          customer={this.state.customer.id}
          processingEdits={this.state.processingEdits}
        />

        <ProductRefill
          productType="1 Litre"
          readOnlyMode={this.state.readOnlyMode}
          balanceName={'balance_01L'}
          balance={this.state.customer.balance_01L}
          balanceChange_cb={this._handleBalanceChange.bind(this)}
          customer={this.state.customer.id}
          processingEdits={this.state.processingEdits}
        />

      </div>
    )
  }

  _recordHasUnsavedEdits = () => {
    return (! objIsEmpty(this.state.customerEdits))
  }

  _handleBalanceChange = async (args) => {
    // Called as a callback from ProductRefill after a new balance value has been 
    // calculated and applied by clicking the Apply button. Receives the appropriate 
    // balance field for the customer record as well as the balance value for that 
    // field.
    let name = args.name
    let value = args.value
    let dataUpdate = {
      [name]: value
    }

    let rc = await this._pushEditsToDB(dataUpdate)
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
  
  _handleButtonEvent = async (e) => {
    // button event handling logic
    e.preventDefault()

    switch (e.target.name) {

      // -------------------------------------
      case 'newCustomer':
      // -------------------------------------
      console.log(e.target.name + " button clicked")          
        break;

      // -------------------------------------
      case 'deleteCustomer':
      // -------------------------------------
      console.log(e.target.name + " button clicked")          
        break;

      // -------------------------------------
      case 'editCustomer':
      // -------------------------------------
        if(this.state.customer.id) {
          this.setState({
            readOnlyMode: ! this.state.readOnlyMode,
          })
        }
        else{
          alert("First find and select a customer")
        }
        break;

      // -------------------------------------
      case 'saveChanges':
      // -------------------------------------
        // call API to update user information
        await this._pushEditsToDB()

        break;

      // -------------------------------------
      case 'cancelChanges':
      // -------------------------------------
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

  _pushEditsToDB = async (args) => {
    // call API to update user information
    let rc = ''
    
    let editData = (objIsEmpty(args)) ? this.state.customerEdits : args

    rc = await DB_User_UPDATE({
      id: this.state.customer.id,
      data: editData,
    })

    // then update customer state info, replacing values in customer 
    // object with updated values from customerEdits object
    this.setState( prevState => ({ 
      customer: {
        ...prevState.customer,
        ...editData
      },
    }))

    this.setState({
      shouldRefreshSearchList: true,
      customerEdits: {},
      readOnlyMode: ! this.readOnlyMode
    })    

    return(rc)
  }

}



export default Main