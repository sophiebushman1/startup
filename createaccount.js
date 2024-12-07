document.addEventListener('DOMContentLoaded', () => {
  const createAccountForm = document.getElementById('create-account-form');
  const errorMessage = document.getElementById('error-message');
  
  createAccountForm.addEventListener('submit', (event) => {
    event.preventDefault();  

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!username || !password) {
      errorMessage.textContent = 'Please provide both username and password.';
      errorMessage.style.display = 'block';
      return;
    }

    // Send create account request
    fetch('http://localhost:3000/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.msg === 'Account created successfully!') {
        alert('Account created successfully!');
        window.location.href = 'index.html';  // Redirect to login page
      } else {
        throw new Error(data.msg || 'Error creating account.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      errorMessage.textContent = error.message || 'Something went wrong. Please try again.';
      errorMessage.style.display = 'block';
    });
  });
});
