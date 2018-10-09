import React from 'react'

const Select = props => {

  return ( 
    <div className={props.parentClass + '-select'}> 
      <label htmlFor={props.name}> 
        {props.title}
      </label>

      <select
        // className   ={props.parentClass + '-select'}
        name        ={props.name}
        value       ={props.value}
        onChange    ={props.handleChange}
      >
        <option id={props.parentClass + '-select-optionDisabled'}
                value=""
                style={{color:'0x666'}}
        >
          {props.placeholder}
        </option>

        {props.options.map( option => {
          return (
            <option 
              key   ={props.parentClass + '-' + option}
              value ={option} 
              label ={option}
            >
              {option}
            </option>
          )
        })}

      </select>
    </div>
  )
}

export default Select