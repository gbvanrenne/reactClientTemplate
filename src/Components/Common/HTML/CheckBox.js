import React from 'react'

const CheckBox = props => {

  return(
    <div className={props.parentClass +'-checkbox'}>
      <label htmlFor={props.parentClass + '-' + props.name}> 
        {props.title}
      </label>

      <div>
        {props.options.map( option => {
          return (
            <label key={option}>
              <input
                className ={props.parentClass + '-checkbox-'}
                id        ={props.parentClass + '-checkbox-' + props.name}
                name      ={props.name}
                value     ={option}
                onChange  ={props.handleChange}
                value     ={option}
                checked   ={props.selectedOptions.indexOf(option) > -1}
                type      ="checkbox"/> {option}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default CheckBox