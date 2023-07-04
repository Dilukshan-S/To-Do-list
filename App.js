import { useState } from 'react';
import AddItem from './AddItem';
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import SearchItem from './SearchItem';
//import './App.css'

function App() 
{
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo_list')));

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id+1 : 1
    const addNewItem = {id, checked:false, item}
    const listItems =[...items, addNewItem] //... used to keep the existing items of the array.
    setItems(listItems)
    //below code to store/save changes
    localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  //function to check and uncheck tasks.
  const handleCheck = (id) => 
  {
   const listItems = items.map((item) => 
    item.id===id ? {...item, checked:!item.checked} : item)
    setItems(listItems)
    //below code to store/save changes
    localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  //function to delete tasks.
  const handleDelete = (id) => 
  {
   const listItems = items.filter((item) => 
   item.id!==id)
    setItems(listItems)
   //below code to store/save changes
    localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }
  
  return (
    <div className = "App">
      <Header title="To-do"/>
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem
        search = {search}
        setSearch ={setSearch}
      />
      <Content
        items = {items.filter(item => (item.item).toLowerCase().includes(search.toLocaleLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer 
        length = {items.length}
      />
    </div>
  );
}

export default App;
