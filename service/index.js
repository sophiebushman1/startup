// Backend (index.js)

const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Assuming you have a User model for MongoDB
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(cookieParser());  // To handle cookies

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// MongoDB setup (ensure MongoDB connection)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/startup_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// User schema and model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  votes: { type: Array, default: [] }
});

const UserModel = mongoose.model('User', UserSchema);

// JWT Secret (this should be in an environment variable in production)
const JWT_SECRET = 'your_secret_key';

// Endpoint to handle login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Set token in cookies for client-side access (optional)
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
    });

    res.json({ token });  // Return token for frontend to store in localStorage
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Endpoint for signup (registration)
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token for the new user
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    // Set token in cookies (optional)
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({ token });  // Return token for frontend to store in localStorage
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Middleware to verify JWT token and protect certain routes
const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

// Protected route example
app.get('/api/user', authMiddleware, (req, res) => {
  res.json({ msg: 'This is a protected route', user: req.user });
});

// Sample quote API
app.get('/api/quote', (req, res) => {
  const quote = {
    quote: 'This is a random quote',
    author: 'Someone famous',
  };
  res.json(quote);
});

// Serve frontend (static files)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

