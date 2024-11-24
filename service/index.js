// Backend (index.js)
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for users (simulating a database)
const users = [
  // Example user for testing
  { username: 'johnDoe', password: 'password123' },
];

// Endpoint for login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    // If username and password match, generate a "token" (simplified for now)
    const token = `token-${user.username}`;

    // Send the token back as a response
    res.json({ token, username: user.username });
  } else {
    res.status(401).json({ msg: 'Invalid username or password' });
  }
});

// Your other backend routes go here

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});


