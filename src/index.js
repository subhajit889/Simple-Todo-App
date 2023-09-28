import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import MainComp from './Components/MainComp';
import { TodoProvider } from './Components/TodoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <MainComp />
    </TodoProvider>
  </React.StrictMode>
);