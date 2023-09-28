import React from 'react';
import { useValue } from '../context/context';
import styles from '../styles/MainForm.module.css';

const MainForm = () => {
  // Access the necessary functions and state from the context
  const { todoText, setTodoText, addTodo } = useValue();
  
  return (
    <div className={styles['todo-form']}>
      {/* Input field for adding a new todo */}
      <input
        type="text"
        placeholder="Add a new todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyPress={(e) => {
          // Call the 'addTodo' function when Enter key is pressed
          if (e.key === 'Enter') addTodo();
        }}
        className={styles['input']}
      />
      {/* Button to add a new todo */}
      <button onClick={addTodo} className={styles['add-button']}>
        Add To-Do
      </button>
    </div>
  );
};

export default MainForm;
