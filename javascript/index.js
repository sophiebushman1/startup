//FRONTEND

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const createAccountBtn = document.getElementById('create-account-btn');

    // new user 
    createAccountBtn.addEventListener('click', () => {
        const email = prompt('Enter your email to create an account:');
        const password = prompt('Enter your password:');
        
        //  sends data to backend to create a new user
        fetch('http://localhost:3000/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                alert('Account created successfully. Token: ' + data.token);
            } else {
                alert('Account creation failed');
            }
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
    });

    // Handle login (POST request to /api/auth/login)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // the login request
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Redirect to the browse 
                localStorage.setItem('auth_token', data.token); // Store token in localStorage
                window.location.href = 'browse.html'; 
            } else {
                // Display login fails
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Login error:', error);
        });
    });

    // FETCH from backend
    fetch('http://localhost:3000/api/hello')
        .then((response) => response.json())
        .then((data) => {
            console.log(data.msg); // logs hello message
            // Display msg
            const backendMessageElement = document.createElement('h1');
            backendMessageElement.textContent = data.msg; 
            document.body.appendChild(backendMessageElement);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});
