import React, { useState, useEffect } from 'react';
import { useValue } from '../context/context';
import styles from '../styles/Navbar.module.css';

function Navbar() {
  // State to store the current date and time
  const [currentDateTime, setCurrentDateTime] = useState('');

  // Access the 'deleteAllTodos' function from the context
  const { deleteAllTodos } = useValue();

  useEffect(() => {
    // Function to update the date and time
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

      // Format the current date and time
      const formattedDate = now.toLocaleDateString(undefined, dateOptions);
      const formattedTime = now.toLocaleTimeString(undefined, timeOptions);
      const formattedDateTime = `${formattedDate} ${formattedTime}`;

      // Set the formatted date and time in the state
      setCurrentDateTime(formattedDateTime);
    };

    // Initial call to update the date and time
    updateDateTime();

    // Set up an interval to update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup: Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.navbar}>
      {/* Header */}
      <h1 className={styles['nav-heading']}>Todo</h1>
      {/* Display the current date and time */}
      <div className={styles['datetime']}>{currentDateTime}</div>
      {/* Button to reset all todos */}
      <button onClick={() => deleteAllTodos()} className={styles['reset-button']}>
        Reset
      </button>
    </div>
  );
}

export default Navbar;