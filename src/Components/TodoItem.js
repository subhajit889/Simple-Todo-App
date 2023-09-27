import React, { useState, useEffect } from 'react';
import styles from '../styles/TodoItem.module.css'; // Import the CSS module

function TodoItem({ todo, completeTodo, deleteTodo, editTodo, isAddingTodo, currentDateTime }) {
  const [isEditing, setEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);
  const [isNewTodo, setIsNewTodo] = useState(false);
  const [isCompleted, setCompleted] = useState(todo.isComplete);

  useEffect(() => {
    if (isAddingTodo) {
      setIsNewTodo(true);
      setTimeout(() => {
        setIsNewTodo(false);
      }, 300); // Remove the fadeIn class after 300ms
    }
  }, [isAddingTodo]);

  const handleEdit = () => {
    if (updatedText.trim() !== '') {
      editTodo(todo.id, updatedText);
      setEditing(false);
    }
  };

  const handleComplete = () => {
    if (!isCompleted) {
      // If the TODO item is not completed, complete it and disable editing
      completeTodo(todo.id);
      setCompleted(true);
      setEditing(false);
    }
  };

  return (
    <div className={`${styles.todo} ${isNewTodo ? styles.fadeIn : ''} ${isCompleted ? styles.complete : ''}`}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            className={styles.inputBox}
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            autoFocus
          />
          <div className={styles.editButtons}>
            <button onClick={handleEdit} className={styles.saveBtn}>
              Save
            </button>
            <button onClick={() => setEditing(false)} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.todoText}>{todo.text}</div>
      )}
      <div className={styles.actions}>
        {!isEditing && (
          <div className={styles.editAndDelete}>
            <button
              onClick={() => setEditing(true)}
              className={`${styles.editBtn} ${isCompleted ? styles.disabled : ''}`}
              disabled={isCompleted}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className={`${styles.deleteBtn} ${isCompleted ? '' : styles.disabled}`}
            >
              Delete
            </button>
          </div>
        )}
        <div className={styles.currentDateTime}>To-do Added on: {currentDateTime}</div>
        <button onClick={handleComplete} className={styles.completeBtn}>
          {isCompleted ? 'Undo' : 'Complete'}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;