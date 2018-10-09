import React from 'react'

const Button = props => {
  
  return(
      <button 
        className ={props.parentClass + '-button' + ' ' + props.name}
        onClick   ={props.action}
      >    
        {props.title} 
      </button>
  )
}

export default Button