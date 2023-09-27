import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

function Navbar({ resetTodos }) {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const formattedDate = now.toLocaleDateString(undefined, dateOptions);
      const formattedTime = now.toLocaleTimeString(undefined, timeOptions);
      const formattedDateTime = `${formattedDate} ${formattedTime}`;
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.navbar}>
      <h1 className={styles['nav-heading']}>Todo</h1>
      <div className={styles['datetime']}>{currentDateTime}</div>
      <button onClick={resetTodos} className={styles['reset-button']}>
        Reset
      </button>
    </div>

  );
}

export default Navbar;