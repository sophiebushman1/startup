import React from 'react';
import { useNavigate } from 'react-router-dom';  // If you still want to use navigation

import Button from 'react-bootstrap/Button';

import './authenticated.css';

// Updated function to navigate to browse.html
const goToBrowse = () => {
  // Redirect to browse.html located in the public folder
  window.location.href = '/browse.html';  // This will navigate to the root directory's browse.html
};

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'DELETE', // Correct method is DELETE
    })
      .catch(() => {
        // Handle logout failure
      })
      .finally(() => {
        localStorage.removeItem('userName');  // Remove user from localStorage
        props.onLogout();  // Notify parent component about logout
      });
  }

  return (
    <div>
      {/* Display logged-in user's name */}
      <div className='playerName'>{props.userName}</div>

      {/* Logout button */}
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>

      {/* Browse button */}
      <Button variant="primary" onClick={goToBrowse}>
        Browse Our Products
      </Button>
    </div>
  );
}
