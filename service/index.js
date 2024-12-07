const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');  // Assuming you have a User model defined in models/User.js
const cookieParser = require('cookie-parser');  // Add cookie-parser

const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow frontend to access backend
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/startup', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Create User Route (POST /api/auth/create)
app.post('/api/auth/create', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required.' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already taken.' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const user = new User({
            username,
            password: hashedPassword
        });
        await user.save();

        // Return success response
        res.status(201).json({ msg: 'Account created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error creating account.' });
    }
});

// Login Route (POST /api/auth/login)
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required.' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials.' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send the JWT token as an HTTP-only cookie
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); // 1 hour expiry
        res.json({ msg: 'Login successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error logging in.' });
    }
});

// Protected Route Example (GET /api/auth/protected)
app.get('/api/auth/protected', (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ msg: 'Not authenticated.' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Token invalid or expired.' });
        }
        res.json({ msg: 'Protected content accessed.', user: decoded });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
