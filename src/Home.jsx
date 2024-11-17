// src/components/Home.jsx
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch request to the backend
        fetch('/api/hello')
            .then((response) => response.text())
            .then((data) => {
                setMessage(data); // Set the response in state
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setMessage('Failed to fetch message.');
            });
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>{message}</p> {/* Display the message */}
        </div>
    );
};

export default Home;
