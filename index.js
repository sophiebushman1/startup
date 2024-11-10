// index.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulating authentication (this should be replaced by real authentication logic)
        if (username === 'user' && password === 'password') {
            window.location.href = 'browse.html'; // Redirect to the browse page
        } else {
            errorMessage.style.display = 'block'; // Show error message
        }
    });
});
