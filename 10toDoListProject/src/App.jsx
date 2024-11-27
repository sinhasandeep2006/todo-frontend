
import { useState, useEffect } from 'react';
import { TodoProvider } from './contexts';
import './App.css';
import TodoForm from './Components/TodoFron';
import TodoItem from './Components/TodoItems';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch all todos from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Failed to fetch todos:', err));
  }, []);

  const addTodo = (todo) => {
    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((newTodo) => setTodos((prev) => [newTodo, ...prev]))
      .catch((err) => console.error('Failed to add todo:', err));
  };


  

  
  const toggleComplete = (id) => {
    const todo = todos.find((t) => t._id === id);
    updateTodo(id, { ...todo, completed: !todo.completed });
  };

  return (
    <TodoProvider value={{ todos, addTodo,  toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo._id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;