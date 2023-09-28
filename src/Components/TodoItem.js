import React, { useState, useEffect } from 'react';
import styles from '../styles/TodoItem.module.css';

function TodoItem({ todo, completeTodo, deleteTodo, editTodo, currentDateTime }) {
  const [isEditing, setEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);
  const [isNewTodo, setIsNewTodo] = useState(false);
  const [isCompleted, setCompleted] = useState(todo.isComplete);
  const [completionTimestamp, setCompletionTimestamp] = useState(null); // Add state for completion timestamp

  useEffect(() => {
    if (isNewTodo) {
      setIsNewTodo(false);
    }
  }, [isNewTodo]);

  const handleEdit = () => {
    if (updatedText.trim() !== '') {
      editTodo(todo.id, updatedText);
      setEditing(false);
    }
  };

  const handleComplete = () => {
    if (!isCompleted) {
      completeTodo(todo.id);
      setCompleted(true);
      setEditing(false);

      // Set the completion timestamp when the task is marked as complete
      setCompletionTimestamp(new Date().toLocaleString());
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
            {!isCompleted && (
              <button
                onClick={() => setEditing(true)}
                className={`${styles.editBtn} ${isCompleted ? styles.disabled : ''}`}
                disabled={isCompleted}
              >
                Edit
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className={`${styles.deleteBtn} ${isCompleted ? '' : styles.disabled}`}
            >
              Delete
            </button>
          </div>
        )}
        <div className={styles.currentDateTime}>
          To-do Added on: {currentDateTime}
          {isCompleted && <div>To-Do Complete on: {completionTimestamp}</div>} {/* Render completion timestamp */}
        </div>
        <button onClick={handleComplete} className={styles.completeBtn}>
          {isCompleted ? 'TASK COMPLETE' : 'Complete'}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;