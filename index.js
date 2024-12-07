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
      credentials: 'include', // Ensure cookies are included in the request
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.msg === 'Login successful!') {
        // On successful login, redirect to browse page
        window.location.href = 'browse.html'; // Redirect to browse page
      } else {
        // If login failed, show error message
        errorMessage.textContent = data.msg || 'Invalid credentials';
        errorMessage.style.display = 'block';
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      errorMessage.textContent = 'No account found. Please try again.';
      errorMessage.style.display = 'block';
    });
  });

  // Create Account button click handler (redirects to account creation page)
  createAccountBtn.addEventListener('click', () => {
    window.location.href = 'createaccount.html'; // Redirect to account creation page
  });
});
