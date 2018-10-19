import React, {Component} from 'react'

import Input from '../Common/HTML/Input'
import Button from '../Common/HTML/Button'
import propTypes from 'prop-types'
import DB_User_UPDATE from '../../DBqueries/DB_User_UPDATE'

import objIsEmpty from '../../Utils/objUtils' 

import './CustomerInfoForm.css'

class CustomerInfoForm extends Component {
  state = {
    customerEdits: {},
  }

  render() {
    return(
      <div className="CustomerInfo">
        <code><ul>
          <li>in edit mode, save field changes to a temp store in the DB to avoid loss of data</li>
          <li>implement cancel changes</li>
          <li>implement save changes</li>
          <li>implement delete / deactivate customer</li>
          <li>implement add new customer</li>
        </ul></code>

        <form className="CustomerInfo-form" onSubmit={this._handleFormSubmit}>

          {/* first name */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'First name'} 
            name          ={'firstName'} 
            value         ={this.props.customer.firstName}
            placeholder   ={'First name'}
            handleChange_callback  ={this._handleInput.bind(this)}
          /> 
          
          {/* last name */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Last name'} 
            name          ={'lastName'} 
            value         ={this.props.customer.lastName}
            placeholder   ={'Last name'}
            handleChange_callback  ={this._handleInput.bind(this)}
          />

          {/* address */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Address'} 
            name          ={'address'} 
            value         ={this.props.customer.address}
            placeholder   ={'Address'}
            handleChange_callback  ={this._handleInput.bind(this)}
          />

          {/* city */}
          <Input
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'City'} 
            name          ={'city'} 
            value         ={this.props.customer.city}
            placeholder   ={'City'}
            handleChange_callback  ={this._handleInput.bind(this)}
          />

          {/* province */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Province'} 
            name          ={'province'} 
            value         ={this.props.customer.province}
            placeholder   ={'Province'}
            handleChange_callback  ={this._handleInput.bind(this)}
          />

          {/* postal code */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Postal Code'} 
            name          ={'postalCode'} 
            value         ={this.props.customer.postalCode}
            placeholder   ={'Postal Code'}
            handleChange_callback  ={this._handleInput.bind(this)}
          />

          {/* phone */}
          <Input  
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Phone'} 
            name          ={'phone'} 
            value         ={this.props.customer.phone}
            placeholder   ={'Phone'}
            handleChange_callback  ={this._handleInput.bind(this)}
          />

         {/* email */}
          <Input
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Email'} 
            name          ={'email'} 
            value         ={this.props.customer.email}
            placeholder   ={'Email'}
            handleChange_callback  ={this._handleInput.bind(this)}
          />

          {/* new customer button*/}
          <Button 
            parentClass   ={'CustomerInfo'}
            name          ={'newCustomer'}
            title         ={'Add New'}
            action        ={this._handleButtonEvent}
          />

          {/* edit customer button*/}
          {/* Show the edit button either in read only mode or in edit mode when no changes
          have yet been made to the record */}
          { (this.props.readOnlyMode === true || 
            (this.props.readOnlyMode === false && ! this._recordHasUnsavedEdits())) &&
          <Button 
            parentClass   ={'CustomerInfo'}
            name          ={'editCustomer'}
            title         ={'Edit'}
            action        ={this._handleButtonEvent}
          />
          }
          {/* delete customer button*/}
          <Button 
            parentClass   ={'CustomerInfo'}
            name          ={'deleteCustomer'}
            title         ={'Delete'}
            action        ={this._handleButtonEvent}
          />

          {/* save changes button*/}
          <Button 
            parentClass   ={'CustomerInfo'}
            name          ={'saveChanges'}
            title         ={'Save Changes'}
            action        ={this._handleButtonEvent}
          />

          {/* cancel changes button*/}
          <Button 
            parentClass   ={'CustomerInfo'}
            name          ={'cancelChanges'}
            title         ={'Cancel Changes'}
            action        ={this._handleButtonEvent}
          />
          
          <p></p>
          
        </form>
      </div>
    )
  }

  _handleInput = (e) => {
    let value = e.target.value;
    let name  = e.target.name;

    // Changing the value of an input field should update the state
    // of the corresponding field up in the Main component, and that 
    // value should trickle back down here via props.

    // when in read only mode, value should be set to props.value. But
    // in edit mode, value should be set to state.value

    this.setState({
      customerEdits: {
        [name]: value,
      }
    })
  }

  _recordHasUnsavedEdits = () => {
    return (! objIsEmpty(this.state.customerEdits))
  }

  _handleButtonEvent = (e) => {
    // button event handling logic
    e.preventDefault()

    switch (e.target.name) {

      case 'newCustomer':          
        break;

      case 'editCustomer':

        if(this.props.customer.id) {
          this.props.setROmode_callback(! this.props.readOnlyMode)
        }
        else{
          alert("First find and select a customer")
        }
        break;

      case 'deleteCustomer':
        break;

      case 'saveChanges':
        console.log(e.target.name)
        break;

      case 'cancelChanges':
        // reset customer edit state variable to an empty object
        this.setState({
          customerEdits: {}
        })

        // set RO mode to true
        this.props.setROmode_callback( true )
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

CustomerInfoForm.propTypes = {
  setROmode_callback: propTypes.func
}

export default CustomerInfoForm