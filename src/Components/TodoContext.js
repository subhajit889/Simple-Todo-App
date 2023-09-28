// TodoContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
  
    const completedTodos = updatedTodos.filter((todo) => todo.isComplete);
    const incompletedTodos = updatedTodos.filter((todo) => !todo.isComplete);
  
    setTodos([...incompletedTodos, ...completedTodos]);
  };

  const resetTodos = () => {
    setTodos([]);
  };
  

  return (
    <TodoContext.Provider
      value={{
        todos,
        inputText,
        setInputText,
        addTodo,
        editTodo,
        deleteTodo,
        completeTodo,
        resetTodos,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
