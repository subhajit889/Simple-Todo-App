import React, { useEffect } from 'react';
import Navbar from './Navbar';
import TodoItem from './TodoItem';
import styles from '../styles/Maincomp.module.css';
import { useTodoContext } from './TodoContext';

function MainComp() {
  const {
    todos,
    inputText,
    setInputText,
    addTodo,
    editTodo,
    deleteTodo,
    completeTodo,
    resetTodos,
    setTodos,
  } = useTodoContext();

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const handleAddTodo = () => {
    if (inputText.trim() === '') return;
    const newTodo = {
      id: generateId(),
      text: inputText,
      isComplete: false,
      createdAt: new Date().toLocaleString(),
    };
    addTodo(newTodo);
    setInputText('');
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      setTodos(parsedTodos);
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [setTodos]);

  return (
    <>
      <Navbar resetTodos={resetTodos} />
      <div className={styles.app}>
        <div className={styles.inputArea}>
          <div className={styles.inputcontainer}>
            <input
              type="text"
              placeholder="Add a new TODO"
              className={styles.inputbox}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') handleAddTodo();
              }}
            />
            <button onClick={handleAddTodo} className={styles.addingbtn}>
              Click to add a todo
            </button>
          </div>
          <div className={styles.todolist}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                currentDateTime={todo.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainComp;
