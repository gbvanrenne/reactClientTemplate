import React, {Component} from 'react'

import Input from '../Common/HTML/Input'
import Button from '../Common/HTML/Button'
import Select from '../Common/HTML/Select'
import TextArea from '../Common/HTML/TextArea'

class CustomerInfoForm extends Component {
  state = {
    editMode: false,
    user: {
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

  optionList = ["Option 1", "Option 2", "Option 3"]
  skillOptions = ['Programming', 'Development', 'Design', 'Testing']

  render() {
    return(
      <div className="CustomerInfo">

        <form className="CustomerInfo-form" onSubmit={this._handleFormSubmit}>
        
          {/* first name */}
          <Input 
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'First name'} 
            name          ={'firstName'} 
            value         ={this.state.user.firstName}
            placeholder   ={'First name'}
            handleChange  ={this._handleInput}
          /> 
          
          {/* last name */}
          <Input 
            parentClass        ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Last name'} 
            name          ={'lastName'} 
            value         ={this.state.user.lastName}
            placeholder   ={'Last name'}
            handleChange  ={this._handleInput}
          />

          {/* address */}
          <Input 
            parentClass        ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Address'} 
            name          ={'address'} 
            value         ={this.state.user.address}
            placeholder   ={'Address'}
            handleChange  ={this._handleInput}
          />

          {/* city */}
          <Input
            parentClass        ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'City'} 
            name          ={'city'} 
            value         ={this.state.user.city}
            placeholder   ={'City'}
            handleChange  ={this._handleInput}
          />

          {/* province */}
          <Input 
            parentClass        ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Province'} 
            name          ={'province'} 
            value         ={this.state.user.province}
            placeholder   ={'Province'}
            handleChange  ={this._handleInput}
          />

          {/* postal code */}
          <Input 
            parentClass        ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Postal Code'} 
            name          ={'postalCode'} 
            value         ={this.state.user.postalCode}
            placeholder   ={'Postal Code'}
            handleChange  ={this._handleInput}
          />

          {/* phone */}
          <Input  
            parentClass        ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Phone'} 
            name          ={'phone'} 
            value         ={this.state.user.phone}
            placeholder   ={'Phone'}
            handleChange  ={this._handleInput}
          />

         {/* email */}
          <Input
            parentClass        ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Email'} 
            name          ={'email'} 
            value         ={this.state.user.email}
            placeholder   ={'Email'}
            handleChange  ={this._handleInput}
          />

          {/* gender */}
          <Select 
            parentClass        ={'CustomerInfo'}
            name          ={'genderSelect'} 
            title         ={'Gender: '} 
            options       ={this.optionList}
            handleChange  ={this._handleInput}
            placeholder   ={'Choose an option...'}
          />

          <p></p>

          {/* new customer button*/}
          <Button 
            parentClass  ={'CustomerInfo'}
            name    ={'newCustomer'}
            title   ={'Add New'}
            action  ={this._handleButtonEvent}
          />

          {/* edit customer button*/}
          <Button 
            parentClass  ={'CustomerInfo'}
            name    ={'editCustomer'}
            title   ={'Edit'}
            action  ={this._handleButtonEvent}
          />

          {/* delete customer button*/}
          <Button 
            parentClass  ={'CustomerInfo'}
            name    ={'deleteCustomer'}
            title   ={'Delete'}
            action  ={this._handleButtonEvent}
          />

          {/* save changes button*/}
          <Button 
            parentClass  ={'CustomerInfo'}
            name    ={'saveChanges'}
            title   ={'Save Changes'}
            action  ={this._handleButtonEvent}
          />

          {/* cancel changes button*/}
          <Button 
            parentClass  ={'CustomerInfo'}
            name    ={'cancelChanges'}
            title   ={'Cancel Changes'}
            action  ={this._handleButtonEvent}
          />
          
          <p></p>
          
        </form>
      </div>
    )
  }

  _handleInput = (e) => {
    let value = e.target.value;
    let name  = e.target.name;
    
    this.setState( prevState => {
      return {
        user: {
          ...prevState.user,
          [name]: value
        }
      }
    })
  }

  _handleButtonEvent = (e) => {
    // button event handling logic
    console.log (e);
  }

  _handleCheckBoxEvent(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.user.skills.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.user.skills.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.user.skills, newSelection];
    }

      this.setState( prevState => ({ user:
        {...prevState.user, skills: newSelectionArray }
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

export default CustomerInfoForm