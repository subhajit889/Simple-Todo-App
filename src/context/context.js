import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

// Create a context for managing todo items
export const itemContext = createContext();

// Custom hook for accessing the context value
function useValue() {
    const value = useContext(itemContext);
    return value;
}

// Custom provider component for managing todo items and state
function CustomItemProvider({ children }) {
    // Retrieve stored todos from local storage or initialize as an empty array
    const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
    // Initialize state variables for todos, input text, and allCompleted flag
    const [todos, setTodos] = useState(localTodos);
    const [todoText, setTodoText] = useState('');
    const [allCompleted, setAllCompleted] = useState(false);

    // Use useEffect to store todos in local storage whenever the todos state changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Function to add a new todo item
    const addTodo = () => {
        if (todoText.trim() !== '') {
            // Create a new todo object with text, completion status, and date added
            const newTodo = { text: todoText, completed: false };
            newTodo.dateAdded = new Date().toLocaleString(); // Capture the timestamp
            // Add the new todo to the beginning of the todos array
            setTodos([newTodo, ...todos]);
            // Clear the input field
            setTodoText('');
        }
    };

    // Function to toggle the completion status of a todo item
    const toggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    // Function to remove a todo item
    const removeTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    // Function to set all todos to completed or uncompleted
    const setAllToCompleted = () => {
        if (allCompleted) {
            // If all todos are currently completed, set all to uncompleted
            const updatedTodos = todos.map((todo) => ({
                ...todo,
                completed: false,
            }));
            setTodos(updatedTodos);
        } else {
            // If all todos are not completed, set all to completed
            const updatedTodos = todos.map((todo) => ({
                ...todo,
                completed: true,
            }));
            setTodos(updatedTodos);
        }

        // Toggle the allCompleted state
        setAllCompleted(!allCompleted);
    };

    // Function to delete all todos
    const deleteAllTodos = () => {
        // Delete all todos by setting the todos array to an empty array
        setTodos([]);
    };

    // Provide the context value to children components
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

// Export the custom provider and the useValue hook
export default CustomItemProvider;
export { useValue };
