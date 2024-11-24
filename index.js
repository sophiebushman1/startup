// Frontend (index.js)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const createAccountBtn = document.getElementById('create-account-btn');

  // Handle form submission
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to backend
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // On successful login, save the token and redirect to browse page
          localStorage.setItem('token', data.token); // Store token in localStorage
          localStorage.setItem('username', data.username); // Store username
          window.location.href = 'browse.html'; // Redirect to browse page
        } else {
          // If login failed, show error
          errorMessage.textContent = data.msg || 'Invalid credentials';
          errorMessage.style.display = 'block';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        errorMessage.textContent = 'Something went wrong. Please try again.';
        errorMessage.style.display = 'block';
      });
  });
});
