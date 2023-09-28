import React from 'react';
import { useValue } from '../context/context';
import styles from '../styles/MainForm.module.css'; // Import the CSS module

const MainForm = () => {
  const { todoText, setTodoText, addTodo } = useValue();
  
  return (
    <div className={styles['todo-form']}>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') addTodo();
        }}
        className={styles['input']}
      />
      <button onClick={addTodo} className={styles['add-button']}>
        Add To-Do
      </button>
    </div>
  );
};

export default MainForm;