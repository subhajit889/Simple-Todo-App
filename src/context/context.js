//Context.js
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const itemContext = createContext();

function useValue() {
    const value = useContext(itemContext);
    return value;
}

function CustomItemProvider({ children }) {
    const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const [todos, setTodos] = useState(localTodos);
    const [todoText, setTodoText] = useState('');
    const [allCompleted, setAllCompleted] = useState(false);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    // Function to add a new todo
    const addTodo = () => {
        if (todoText.trim() !== '') {
            const newTodo = { text: todoText, completed: false };
            newTodo.dateAdded = new Date().toLocaleString(); // Capture the timestamp
            setTodos([newTodo, ...todos]);
            setTodoText('');
        }
    };
    
    // Function to toggle the completion status of a todo
    const toggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    // Function to remove a todo
    const removeTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    // Function to set completed all
    const setAllToCompleted = () => {
        if (allCompleted) {
            // If all todos are currently completed, set all to false
            const updatedTodos = todos.map((todo) => ({
                ...todo,
                completed: false,
            }));
            setTodos(updatedTodos);
        } else {
            // If all todos are not completed, set all to true
            const updatedTodos = todos.map((todo) => ({
                ...todo,
                completed: true,
            }));
            setTodos(updatedTodos);
        }

        // Toggle the allCompleted state
        setAllCompleted(!allCompleted);
    };

    // Function for delete all
    const deleteAllTodos = () => {
        // Delete all todos by setting the todos array to an empty array
        setTodos([]);
    };

    return (
        <itemContext.Provider value={{
            addTodo,
            toggleTodo,
            removeTodo,
            todos,
            setTodos,
            todoText,
            setTodoText,
            setAllToCompleted,
            deleteAllTodos
        }}>
            {children}
        </itemContext.Provider>
    )
}

export default CustomItemProvider;
export { useValue };