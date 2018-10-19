import React, {Component} from 'react'

class Input extends Component {

  state = {
    value: '',
  }

  componentDidUpdate() {

    // When the component gets updated while it's in read-only mode, set the value
    // in the state to the value passed from the parent component
    if (this.props.disabled) {
      if (this.state.value !== this.props.value) {
        this.setState({
          value: this.props.value
        })
      }
    }
  }

  render() {

    return (
      <div className={this.props.parentClass +"-input"}>
        <label htmlFor={this.props.name}> 
          {this.props.title}
        </label>

        <input
          id          ={this.props.parentClass + '-input-' + this.props.name}
          name        ={this.props.name}
          type        ={this.props.type}
          value       ={this.state.value || ''}
          disabled    ={this.props.disabled}
          onChange    ={this._handleChange}
          // placeholder ={this.props.placeholder}
          />

      </div>
    )
  }

  _handleChange = (e) => {
    let value = e.target.value;
    let name  = e.target.name;

    this.setState({
      value: value,
    })

    this.props.handleChange_callback(e)
  }
}

export default Input