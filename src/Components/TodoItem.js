import React, { useState } from 'react';
import { useValue } from '../context/context';
import styles from '../styles/TodoItem.module.css';

const TodoItem = ({ todo, index }) => {
  // Access the necessary functions and state from the context
  const { removeTodo, todos, setTodos } = useValue();

  // State to track whether the todo item is being edited
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the edited text of the todo item
  const [editedText, setEditedText] = useState(todo.text);

  // Function to enable editing of the todo item
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save the edited text
  const handleSave = () => {
    // Create a copy of the todos array and update the text of the selected todo
    const updatedTodos = [...todos];
    updatedTodos[index].text = editedText;
    // Update the todos state with the modified array and exit edit mode
    setTodos(updatedTodos);
    setIsEditing(false);
  };

  // Function to cancel editing and revert to the original text
  const handleCancel = () => {
    // Revert the edited text to the original text and exit edit mode
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
              // Create a copy of the todos array and mark the todo as completed
              const updatedTodos = [...todos];
              updatedTodos[index].completed = true;
              // Capture the timestamp for completion and update the todos state
              updatedTodos[index].dateCompleted = new Date().toLocaleString();
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