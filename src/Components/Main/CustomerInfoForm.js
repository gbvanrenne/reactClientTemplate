import React, {Component} from 'react'
import Input from '../Common/HTML/Input'
import './CustomerInfoForm.css'

class CustomerInfoForm extends Component {
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
            value         ={this.props.customer.firstName || ""}
            placeholder   ={'First name'}
            handleChange_callback  ={this.props.inputChange_cb}
          /> 
          
          {/* last name */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Last name'} 
            name          ={'lastName'} 
            value         ={this.props.customer.lastName || ""}
            placeholder   ={'Last name'}
            handleChange_callback  ={this.props.inputChange_cb}
          />

          {/* address */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Address'} 
            name          ={'address'} 
            value         ={this.props.customer.address || ""}
            placeholder   ={'Address'}
            handleChange_callback  ={this.props.inputChange_cb}
          />

          {/* city */}
          <Input
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'City'} 
            name          ={'city'} 
            value         ={this.props.customer.city || ""}
            placeholder   ={'City'}
            handleChange_callback  ={this.props.inputChange_cb}
          />

          {/* province */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Province'} 
            name          ={'province'} 
            value         ={this.props.customer.province || ""}
            placeholder   ={'Province'}
            handleChange_callback  ={this.props.inputChange_cb}
          />

          {/* postal code */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Postal Code'} 
            name          ={'postalCode'} 
            value         ={this.props.customer.postalCode || ""}
            placeholder   ={'Postal Code'}
            handleChange_callback  ={this.props.inputChange_cb}
          />

          {/* phone */}
          <Input  
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Phone'} 
            name          ={'phone'} 
            value         ={this.props.customer.phone || ""}
            placeholder   ={'Phone'}
            handleChange_callback  ={this.props.inputChange_cb}
          />

         {/* email */}
          <Input
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'CustomerInfo'}
            type          ={'text'} 
            title         ={'Email'} 
            name          ={'email'} 
            value         ={this.props.customer.email || ""}
            placeholder   ={'Email'}
            handleChange_callback  ={this.props.inputChange_cb}
          />
        </form>
      </div>
    )
  }
}

export default CustomerInfoForm