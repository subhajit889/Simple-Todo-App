import React, { useState } from 'react';
import { useValue } from '../context/context';
import styles from '../styles/TodoItem.module.css';

const TodoItem = ({ todo, index }) => {
  const { removeTodo, todos, setTodos } = useValue();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editedText;
    setTodos(updatedTodos);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={styles.totalContainer}>
      <div className={`${styles['todo-item']} ${todo.completed ? styles.completed : ''}`}>
        <div className={styles['todo-item-content']}>{todo.text}</div>
        <div className={styles['todo-item-buttons']}>
          {isEditing ? (
            <div className={styles.editSection}>
                <input
                type="text"
                value={editedText}
                className={styles.editInput}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <button onClick={handleSave} className={styles['saveBtn']}>
                Save
              </button>
              <button onClick={handleCancel} className={styles['cancelBtn']}>
                Cancel
              </button>
            </div>
          ) : (
            <>
              {!todo.completed && (
                <button onClick={handleEdit} className={styles['editBtn']}>
                  Modify
                </button>
              )}
              <button onClick={() => removeTodo(index)} className={styles['deleteBtn']}>
                Delete
              </button>
            </>
          )}
        </div>
        <div className={styles.dateTime}>
          <span className={styles.addTimeStamp}>
            {todo.dateAdded && `Added on : ${todo.dateAdded}`}{' '}
          </span>
          <span className={styles.completeTimeStamp}>
            {todo.completed && todo.dateCompleted && `Completed: ${todo.dateCompleted}`}
          </span>
        </div>
        
        {!todo.completed && (
          <button
            onClick={() => {
              const updatedTodos = [...todos];
              updatedTodos[index].completed = true;
              updatedTodos[index].dateCompleted = new Date().toLocaleString(); // Capture the timestamp
              setTodos(updatedTodos);
            }}
            className={`${styles['mark-button']} ${styles['mark-button-large']}`}
          >
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;