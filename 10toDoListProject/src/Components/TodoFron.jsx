import React, { useState } from 'react'
import { useTodo } from '../Contexts/ToDocontext';
function todoFron() {
  const [ todo,settodo] =useState('')
  const {addTodo} =useTodo();
  const add =(e)=>{
    e.preventDefault()
    if(!todo)  return
    addTodo({todo,comleted:false})
    settodo("");
  }
  return (
    <div>
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>settodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    </div>
  )
}

export default todoFron

