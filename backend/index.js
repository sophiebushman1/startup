// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// User Model
const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  
  try {
    await newUser.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
