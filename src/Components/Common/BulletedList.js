
import React, { Component } from 'react';

function BulletedList(props) {
  
  const listItems =
    props.listItems.map ( (listItem, index) => 
      <BulletListItem key={index.toString()} listItem={listItem} />
    )
    
  return (
    <div className="container" style={{textAlign:"left"}}>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

function BulletListItem(props) {
  return (
    <li>{props.listItem}</li>
  )
}

export default BulletedList