// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';

function App() {
    const [message, setMessage] = useState(''); // State to store the backend message

    useEffect(() => {
        // Fetch message from the backend
        fetch('/api/hello')
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message); // Set the message to state
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to run the fetch only once when the component mounts

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

                {/* Display the backend message */}
                {message && <h1>{message}</h1>} {/* Only render if message is available */}

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
