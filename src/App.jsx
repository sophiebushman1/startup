// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';

function App() {
    return (
        <Router>
            <div>
                {/* Navigation Links */}
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About</Link>
                </nav>

                {/* Route Definitions */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                </Routes>

                {/* Footer */}
                <footer>
                    <p>Your Name</p>
                    <a href="https://github.com/yourusername/yourrepository" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                </footer>
            </div>
        </Router>
    );
}

export default App;
