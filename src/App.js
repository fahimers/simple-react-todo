import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const { v4: uuidV4 } = require('uuid');
const local_storage_key = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(()=> {
    
    const storedTodos = JSON.parse(localStorage.getItem(local_storage_key))
    if(storedTodos)setTodos(storedTodos)

  }, [])

  useEffect(() =>{
  localStorage.setItem(local_storage_key,JSON.stringify(todos))

  },[todos])

  function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id ===id)
  todo.complete = !todo.complete
  setTodos(newTodos)


  }
  
  function handleAddTodo(e){

    const name = todoNameRef.current.value
    console.log(uuidV4());
    if(name === '') return
    setTodos(prevTodos =>{
        return[...prevTodos,{id: uuidv4(), name: name, complete:false}]
    })
    todoNameRef.current.value=null;
  }
 
  function handleClearfunction(){

    const newTodos = todos.filter(todo=> !todo.complete)
    setTodos(newTodos)
  }
  return (
   <>
   <ToDoList todos= {todos} toggleTodo= {toggleTodo} />
   <input ref= {todoNameRef} type = "text"/>
   <button onClick={handleAddTodo} >Add Todo</button>
   <button onClick = {handleClearfunction}>Clear Completed Todos </button>
   <div>{todos.filter(todo => !todo.complete).length}  left to do</div>
 </>
 )
}
 

export default App;
