import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import { useState,useEffect } from 'react';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
function App() {
  const API_URL='http://localhost:3500/items';
  const [items, setItems] = useState([]);

    const [newItem,setNewItem]=useState('')
    const [search,setSearch]=useState('')
    const[fetchError,setFetchError]=useState(null)
    const additem=(item)=>{
      const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;
      const addNewItem={
        id,checked:false,item
      }
      const listItems=[...items,addNewItem]
      setItems(listItems)
      const postOptions={
        method:'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(addNewItem)
      }
      const result=apiRequest(API_URL,postOptions)
      
    }
    useEffect(
      ()=>{
       const fetchItems=async()=>{
        try {
          const response= await fetch(API_URL);
          if(!response.ok) throw Error("Data not received");
          console.log(response);
          const listItems=await response.json();
          console.log(listItems);
          setItems(listItems);
          setFetchError(null);
        } catch (error) {
          console.log(error.stack)
        }
       }

      (async ()=> fetchItems())()
      },[]
    )
    const handleSubmit=(e)=>{
      e.preventDefault()
      
      if(!newItem) return;
      console.log(newItem)
      additem(newItem)
     
      setNewItem('')
    }


    const handleCheck=(id)=>{
      const listitems=items.map((item)=> (item.id===id)?{...item,checked:!item.checked}:item)
      setItems(listitems)
  }
    const deleteButton=(id)=>{
      const updatedItems=items.filter(item=>item.id!==id)
      setItems(updatedItems)

     // console.log("Button delete Clicked");
    }
 
  return (
    <div className='App'>
      <Header />
      <AddItem newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <SearchItem
      search={search}
      setSearch={setSearch}
      />
      
      <Content items={items.filter(item=>(item.item).toLowerCase().includes(search.toLowerCase()))}
      setItems={setItems}
      handleCheck={handleCheck}
      deleteButton={deleteButton}
      />
      <Footer
      length={items.length}
      />

    </div>
  );
}


export default App;
