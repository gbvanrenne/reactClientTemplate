import React, {Component} from 'react'

class Input extends Component {

  state = {
    value: '',
  }

  componentDidUpdate() {
    // use the props value when in read-only mode or when updating refill qty which 
    // is enabled in read-only mode

    if (this.props.disabled || this.props.parentClass === 'ProductRefill') {

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
          value       ={this.state.value || ""}
          disabled    ={this.props.disabled}
          onChange    ={this._handleChange}
          autoComplete={'off'}
          // placeholder ={this.props.placeholder}
          />

          {(this.state.value !== this.props.value) &&
            <span style={{
                paddingLeft: '10px',
                fontStyle: 'italic',
                color: '#999',
              }}
            >
              {this.props.value === 0 ? '' :
                this.props.value === "" ? '(blank)' : this.props.value}
            </span>
          }

      </div>
    )
  }

  _handleChange = (e) => {
    let value = e.target.value;
    // let name  = e.target.name;

    this.setState({
      value: value,
    })

    this.props.handleChange_callback(e)
  }
}

export default Input