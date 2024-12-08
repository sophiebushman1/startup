// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateAccount from './createaccount';  // Import CreateAccount component
import Login from './login';  // Import Login component
import Browse from './Browse';  // Import the Browse component if needed

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/signup">Sign Up</Link> | 
          <Link to="/login">Login</Link> |
          <Link to="/browse">Browse</Link> {/* Only if Browse is part of the app */}
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to the Homepage!</h1>} />
          <Route path="/browse" element={<Browse />} />  {/* Route for the Browse page */}
          <Route path="/signup" element={<CreateAccount />} /> {/* Route for CreateAccount */}
          <Route path="/login" element={<Login />} /> {/* Route for Login */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


