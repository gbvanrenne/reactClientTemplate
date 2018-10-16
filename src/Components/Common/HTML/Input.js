import React from 'react'

function _handleFocus(e) {
  e.target.select()
}


const Input = props => {

  return (
    <div className={props.parentClass +"-input"}>
      <label htmlFor={props.name}> 
        {props.inputLabel}
      </label>

      <input
        id          ={props.parentClass + '-input-' + props.name}
        name        ={props.name}
        type        ={props.type}
        defaultValue={props.value}
        value       ={props.value}
        placeholder ={props.placeholder}
        disabled    ={props.disabled}
        onChange    ={props.handleChange}
        onFocus     ={_handleFocus}
      />
    </div>
  )
}

export default Input