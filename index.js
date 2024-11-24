// FRONTEND (index.js)

document.addEventListener('DOMContentLoaded', () => {
  // Check if the user is already logged in (check for token in localStorage)
  const token = localStorage.getItem('token');
  if (token) {
    // If the user is logged in, hide the login section and show the user info section
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('user-info-section').style.display = 'block';
    document.getElementById('user-info').textContent = `Welcome back!`;
    document.getElementById('logout-btn').style.display = 'block';
  }

  // Fetch and display random quote
  const fetchRandomQuote = () => {
    fetch('https://quote.cs260.click')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quote');
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById('quote').textContent = `"${data.quote}"`;
        document.getElementById('quote-author').textContent = `- ${data.author}`;
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').textContent = 'Error loading quote.';
        document.getElementById('quote-author').textContent = '';
      });
  };

  fetchRandomQuote();

  // Handle login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Send login request to backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store JWT token in localStorage
        localStorage.setItem('token', data.token);

        // Hide login section and show user info
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('user-info-section').style.display = 'block';
        document.getElementById('user-info').textContent = `Welcome, ${username}!`;
        document.getElementById('logout-btn').style.display = 'block';
        alert('Login successful!');
      } else {
        document.getElementById('error-message').style.display = 'block';
      }
    });
  }

  // Handle signup form submission
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      // Send signup request to backend
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('user-info-section').style.display = 'block';
        document.getElementById('user-info').textContent = `Welcome, ${email}!`;
        document.getElementById('logout-btn').style.display = 'block';
        alert('Signup successful!');
      } else {
        document.getElementById('signup-error-message').style.display = 'block';
      }
    });
  }

  // Show signup form when "Create Account" button is clicked
  const createAccountBtn = document.getElementById('create-account-btn');
  if (createAccountBtn) {
    createAccountBtn.addEventListener('click', () => {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('signup-section').style.display = 'block';
    });
  }

  // Back to login button in signup section
  const backToLoginBtn = document.getElementById('back-to-login-btn');
  if (backToLoginBtn) {
    backToLoginBtn.addEventListener('click', () => {
      document.getElementById('signup-section').style.display = 'none';
      document.getElementById('login-section').style.display = 'block';
    });
  }

  // Handle logout button click
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clear the token from localStorage
      localStorage.removeItem('token');

      // Hide user info and show login section again
      document.getElementById('user-info-section').style.display = 'none';
      document.getElementById('login-section').style.display = 'block';
      alert('Logged out successfully!');
    });
  }
});
