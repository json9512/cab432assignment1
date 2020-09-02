import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ReactDOM component renders the React App component on the 'root' element in html doc
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
