import React from 'react'

import LineItems from './LineItems';
const ItemsList = ({items,handleCheck,deleteButton}) => {
  return (
    <ul>
              {items.map((item)=>(
              <LineItems
              key={item.id}
            item={item}
              handleCheck={handleCheck}
              deleteButton={deleteButton}
             />
           
              ))}
            
          </ul>
  )
}

export default ItemsList