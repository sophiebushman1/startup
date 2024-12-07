const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');  // Assuming you have a User model

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;
const authCookieName = 'authToken';  // Cookie name for the authentication token
const jwtSecret = 'your_jwt_secret';  // Secret key for JWT

// Middleware
app.use(express.json());
app.use(cookieParser());  // Parse cookies in requests

// Load MongoDB credentials from dbConfig.json
const dbConfigPath = path.join(__dirname, 'dbConfig.json');
const dbConfig = JSON.parse(fs.readFileSync(dbConfigPath, 'utf8'));

// MongoDB connection string using Atlas
const mongoUri = `mongodb+srv://${dbConfig.username}:${encodeURIComponent(dbConfig.password)}@${dbConfig.hostname}/${dbConfig.dbname}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Create User (Register)
app.post('/api/auth/create', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Username and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ msg: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword
    });
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, jwtSecret, { expiresIn: '1h' });

    // Set the auth token in a secure, HttpOnly cookie
    setAuthCookie(res, token);

    res.status(201).json({ msg: 'User created successfully!', id: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating user.' });
  }
});

// Login User (Authenticate)
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials.' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials.' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    // Set the auth token in a secure, HttpOnly cookie
    setAuthCookie(res, token);

    res.json({ msg: 'Login successful!', id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error logging in.' });
  }
});

// Logout User (Clear Cookie)
app.delete('/api/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);  // Clear the auth token from the cookie
  res.status(204).end();
});

// Middleware to protect routes
app.use('/api/secure', async (req, res, next) => {
  const token = req.cookies[authCookieName];  // Get the token from the cookie

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;  // Attach the decoded user info to the request
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token or expired.' });
  }
});

// Example protected route
app.get('/api/secure/userinfo', (req, res) => {
  res.json({ msg: 'Protected user info', user: req.user });
});

// Utility function to set auth token in cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,  // Only send over HTTPS (set to false for local development)
    httpOnly: true,  // Prevent JavaScript access to cookies
    sameSite: 'strict',  // Prevent cross-site request forgery
    expires: new Date(Date.now() + 3600000),  // Cookie expires in 1 hour
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
