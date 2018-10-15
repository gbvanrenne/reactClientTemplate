import React, {Component} from 'react'

import Input from '../Common/HTML/Input'
import Button from '../Common/HTML/Button'
// import TextArea from '../Common/HTML/TextArea'

import RecentTransactions from './RecentTransactions'

class ProductRefill extends Component {

  constructor(props) {
    super(props)

    this.actionOptions = ['DEDUCT (-)', 'ADD (+)']

    this.state = {
      actionOption: 'DEDUCT (-)',
      actionOptionsIndex: 0,
      refillQty: 0,
      balance: 0,
    }
  }

componentWillMount() {
  if (this.state.balance === 0) {
    this.setState({
      actionOptionsIndex: 1,
      actionOption: 'ADD (+)'
  })
  }
}
  
componentDidUpdate()  {

  if (this.state.balance === 0 && this.state.actionOption === 'DEDUCT (-)') {
    this.setState({
      actionOptionsIndex: 1,
      actionOption: 'ADD (+)',
  })
  }
}

  render() {
    return(
      <div className="ProductRefill">

        <form className="ProductRefill-form" onSubmit={this._handleFormSubmit}>
        
          <h3>{this.props.productType}</h3>

          {/* deduct / add state button */}
          <Button 
            disabled      ={! this.props.readOnlyMode}
            parentClass   ={'ProductRefill'}
            name          ={'refillType'}
            title         ={this.state.actionOption}
            action        ={this._handleButtonEvent}
          />

          {/* refill balance */}
          <Input 
            disabled      ={this.props.readOnlyMode}
            parentClass   ={'ProductRefill'}
            type          ={'text'} 
            title         ={'Balance'} 
            inputLabel    ={'Balance'} 
            name          ={'balance'} 
            value         ={this.state.balance}
            handleChange  ={this._handleInput}
          /> 

          {/* deduct / add quantity */}
          <Input 
            disabled      ={! this.props.readOnlyMode}
            parentClass   ={'ProductRefill'}
            type          ={'text'} 
            title         ={'Refill Qty'} 
            inputLabel    ={'Refill Qty'} 
            name          ={'refillQty'} 
            value         ={this.state.refillQty}
            handleChange  ={this._handleInput}
          />

          {/* apply / submit button */}
          <Button 
            parentClass   ={'ProductRefill'}
            name          ={'applyChange'}
            title         ={'Apply'}
            action        ={this._handleButtonEvent}
          />
          <br />
          <code>Recent transactions</code><br />
          <RecentTransactions />

        </form>
      </div>
    )
  }

  _handleInput = (e) => {
    let value = e.target.value;
    let name  = e.target.name;
    
    this.setState( prevState => {
      return {
          [name]: value
      }
    })
  }

  _handleButtonEvent = (e) => {
    // button event handling logic
    e.preventDefault()

    switch (e.target.name) {

      case 'refillType':

        var optionIndex

        if (this.state.balance > 0) {
          optionIndex = Math.abs(this.state.actionOptionsIndex - 1)
        }
        else {
          optionIndex = 1
        }

        this.setState({
          actionOptionsIndex: optionIndex,
          actionOption: this.actionOptions[optionIndex]
        })
          
        break;

      case 'applyChange':
        // Assume you're adding credits by default
        var multiplier = 1
        var newBalance = this.state.balance
        
        // Change the multiplier to -1 if the action is a refill
        if (this.state.actionOptionsIndex === 0) {
          multiplier = -1
        }

        // increase or decrease balance
        newBalance += multiplier * this.state.refillQty

        // Adjust the new balance up or down based on the specified refill qty
        // If deducting credits, disallow operation if it would result in less
        // than 0 credits left on the account.
        if (newBalance >= 0) {
          this.setState({
            refillQty: 0,
            balance: newBalance
          })
        }
        else {
          alert("Insufficient credits.")
        }

        break;

      default:
        break;
    }
  }

  _handleFormSubmit = () => {
    // form submission logic
    console.log("_handleFormSubmit")
  }
}

export default ProductRefill