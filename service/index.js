//BACKEND

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.get('*', (_req, res) => {
  res.send({ msg: 'Service' });
});
app.use(express.static('public'));

// Endpoint to respond with a hello message
app.get('/api/hello', (req, res) => {
  console.log('Frontend connected to /api/hello');
  res.json({ msg: 'Hello from the backend!' });
});

// In-memory storage for users (to simulate a database)
const users = [];

// Endpoint for creating new users (sign-up)
app.post('/api/hello', (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ msg: 'Email already in use' });
    }

    // Create a new user and store in the array
    const newUser = { email, password };
    users.push(newUser);

    // Simulate token generation (for simplicity, we'll return the email as the token)
    const token = `token-${email}`;
    res.json({ token });
});

// Endpoint for login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);
    if (user && user.password === password) {
        // Generate a token (simplified for demonstration)
        const token = `token-${user.email}`;
        res.json({ token });
    } else {
        res.status(401).json({ msg: 'Invalid email or password' });
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


