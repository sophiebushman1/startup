// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import CreateAccount from './createaccount';
import Browse from './browse';
import Checkout from './checkout';

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to Startup</h1>

      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
