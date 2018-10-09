import React from 'react'

const Input = props => {

  return (
    <div className={props.parentClass +"-input"}>
      <label htmlFor={props.name}> 
        {props.title}
      </label>

      <input
        // className   ={props.parentClass + '-input'}
        id          ={props.parentClass + '-input-' + props.name}
        name        ={props.name}
        type        ={props.type}
        value       ={props.value}
        onChange    ={props.handleChange}
        placeholder ={props.placeholder}
      />
    </div>
  )
}

export default Input