import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import TodoItem from './Components/TodoItem';
import MainForm from './Components/MainForm';
import { useValue } from './context/context';

function App() {
  const { todos } = useValue();
  const sortedTodos = todos.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    }
    if (!a.completed && b.completed) {
      return -1;
    }
    return 0;
  });

  return (
    <>
      <Navbar />
      <div className="todo-app">
        <MainForm />
        <div className="todo-list">
          {sortedTodos.map((todo, index) => (
            <TodoItem key={index} todo={todo} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;