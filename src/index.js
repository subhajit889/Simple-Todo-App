import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import App from './App';
import CustomItemProvider from "./context/context";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomItemProvider>
      <App />
    </CustomItemProvider>
  </React.StrictMode>
);