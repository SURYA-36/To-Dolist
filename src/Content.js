import React from "react"
import ItemsList from "./ItemsList";



function Content({items,setItems,handleCheck,deleteButton}) {
  
    return (
        <main>
          {(items.length)?(
            <ItemsList
            items={items}
     
      handleCheck={handleCheck}
      deleteButton={deleteButton}/>
          ):(
            <p>Your list is empty</p>
          )
        }
        
        </main>
    )
}

export default Content