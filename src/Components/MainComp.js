import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TodoItem from './TodoItem';
import styles from "../styles/Maincomp.module.css"

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

function MainComp() {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');


    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (inputText.trim() === '') return;
        const newTodo = {
            id: generateId(),
            text: inputText,
            isComplete: false,
            createdAt: new Date().toLocaleString(),
        };
        setTodos([newTodo, ...todos]);
        setInputText('');
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
        setTodos(updatedTodos);
    };

    const resetTodos = () => {
        setTodos([]);
    };

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
                                if (e.key === 'Enter') addTodo();
                            }}
                        />
                        <button onClick={addTodo} className={styles.addingbtn}>Click for add a todo</button>
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
