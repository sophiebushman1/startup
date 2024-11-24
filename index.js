// FRONTEND index.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const createAccountBtn = document.getElementById('create-account-btn');
  
  // Handle form submission for login
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Clear previous error messages
    errorMessage.style.display = 'none';
    
    // Validate user inputs (basic validation to ensure fields are not empty)
    if (!username || !password) {
      errorMessage.textContent = 'Please fill in both fields.';
      errorMessage.style.display = 'block';
      return;
    }

    // Send login request to backend
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),  // Send username and password
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login failed, please check your credentials.');
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        // On successful login, save the token and redirect to browse page
        localStorage.setItem('token', data.token); // Store token in localStorage
        window.location.href = 'browse.html'; // Redirect to browse page
      } else {
        // If login failed, show error message
        errorMessage.textContent = data.msg || 'Invalid credentials';
        errorMessage.style.display = 'block';
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      // Show a generic error message to the user
      errorMessage.textContent = 'No account found. Please try again.';
      errorMessage.style.display = 'block';
    });
  });

  // Create Account button click handler (if you want to implement account creation later)
  createAccountBtn.addEventListener('click', () => {
    window.location.href = 'createaccount.html'; // Redirect to account creation page
  });
});
