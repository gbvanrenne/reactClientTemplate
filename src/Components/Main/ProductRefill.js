import React, {Component} from 'react'

import Input from '../Common/HTML/Input'
import Button from '../Common/HTML/Button'
// import TextArea from '../Common/HTML/TextArea'

import RecentTransactions from './RecentTransactions'

class ProductRefill extends Component {

  actionOptions = ['DEDUCT (-)', 'ADD (+)']

  state = {
    actionOption: 'DEDUCT (-)',
    actionOptionsIndex: 0,
    refillQty: 0,
    balance: 0,
  }

  componentWillMount = () => {
    if (this.state.balance === 0) {
      this.setState({
        actionOptionsIndex: 1,
        actionOption: 'ADD (+)'
      })
    }

    this.setState({ balance: this.props.balance || 0})
  }

  componentDidUpdate = () => {
    if (this.state.balance === 0 && this.state.actionOption === 'DEDUCT (-)') {
      this.setState( prevState => {
        return ({
          ...prevState,
          actionOptionsIndex: 1,
          actionOption: 'ADD (+)',
        })
      })
    }

    if (this.state.balance !== this.props.balance) {
      this.setState({ balance: this.props.balance })
    }
  }

  render() {
    return(
      <div className="ProductRefill">

        <form className="ProductRefill-form" onSubmit={this._handleFormSubmit}>
        
          <h3>{this.props.productType}</h3>

          {/* deduct / add state button */}
          <Button 
            disabled      ={this.props.readOnlyMode}
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
            balanceType   ={this.props.balanceName} 
            value         ={this.state.balance || 0}
            handleChange_callback  ={this._handleNumberInput.bind(this)}
          /> 

          {/* deduct / add quantity */}
          <Input 
            disabled =
              {
                this.props.customer === '' || 
                this.props.customer === undefined || 
                !this.props.readOnlyMode
              }
            parentClass   ={'ProductRefill'}
            type          ={'text'} 
            title         ={'Refill Qty'} 
            inputLabel    ={'Refill Qty'} 
            name          ={'refillQty'} 
            value         ={this.state.refillQty}
            handleChange_callback  ={this._handleNumberInput.bind(this)}
          />

          {/* apply / submit button */}

          {this.props.readOnlyMode &&
          <Button 
            disabled      ={! this.props.readOnlyMode}
            parentClass   ={'ProductRefill'}
            name          ={'applyChange'}
            title         ={'Apply'}
            action        ={this._handleButtonEvent}
          />
          }
          
          <p></p>

          <code>Recent transactions</code><br />
          <RecentTransactions customer={this.props.customer}/>

          <p></p>
          <p></p>

        </form>
      </div>
    )
  }

  _handleNumberInput = (e) => {
    var value = e.target.value;
    var name  = e.target.name;

    value = (value === '') ? '' : parseInt(value)

    this.setState({
          [name]: value
      })
  }

  _handleButtonEvent = (e) => {
    // button event handling logic
    e.preventDefault()

    switch (e.target.name) {

      // ------------------------------------
      case 'refillType':
      // ------------------------------------

        if (! this.props.readOnlyMode) break; 

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

      // ------------------------------------
      case 'applyChange':
      // ------------------------------------

        if (this.props.readOnlyMode) {
          // Assume you're adding credits by default
          var multiplier = 1
          
          // Change the multiplier to -1 if the action is a refill
          if (this.state.actionOptionsIndex === 0) {
            multiplier = -1
          }

          // increase or decrease balance
          const newBalance = parseInt(this.state.balance) + (multiplier * parseInt(this.state.refillQty))

          // Adjust the new balance up or down based on the specified refill qty
          // If deducting credits, disallow operation if it would result in less
          // than 0 credits left on the account.

          if (newBalance >= 0) {
            this.setState({
              refillQty: 0,
              balance: parseInt(newBalance)
            })

            this.props.balanceChange_cb({
              value: newBalance,
              name: this.props.balanceName, 
            })
          }
          else {
            alert("Insufficient credits.")
          }
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