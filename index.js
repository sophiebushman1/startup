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

    // Fetch message from the backend when the page loads
    fetch('http://localhost:4000/api/hello')  // Make sure the URL matches the backend API
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message); // This should log: "Hello from your backend!"
            // Display message on the page if needed
            const backendMessageElement = document.createElement('h1');
            backendMessageElement.textContent = data.message; // Display the message on the page
            document.body.appendChild(backendMessageElement);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});
