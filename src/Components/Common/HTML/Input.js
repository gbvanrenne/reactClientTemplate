import React from 'react'

const Input = (props) => {

  return (
    <div className={props.parentClass +"-input"}>
      <label htmlFor={props.name}> 
        {props.title}
      </label>

      <input
<<<<<<< HEAD
        readOnly
=======
        readOnly    ={props.disabled}
>>>>>>> cde520d23261a647ffc4b0ec8fd489c5714b6ac8
        id          ={props.parentClass + '-input-' + props.name}
        name        ={props.name}
        type        ={props.type}
        value       ={props.value || ''}
        // placeholder ={props.placeholder}
        // disabled    ={props.disabled}
      />

    </div>
  )
}

export default Input