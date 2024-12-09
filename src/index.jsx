// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// This is the entry point for your React app
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root') // Make sure you have a <div id="root"></div> in your index.html
);

