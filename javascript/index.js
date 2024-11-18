//FRONTEND

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        
        if (username === 'user' && password === 'password') {
            window.location.href = 'browse.html'; 
        } else {
            errorMessage.style.display = 'block'; 
        }
    });

    // FETCH from backend
    fetch('http://localhost:3000/api/hello')  // DOes the URL == backend API?
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message); // logs hello message
            // Displays
            const backendMessageElement = document.createElement('h1');
            backendMessageElement.textContent = data.message; 
            document.body.appendChild(backendMessageElement);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            
        });
});
