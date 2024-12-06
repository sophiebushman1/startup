const mongoose = require('mongoose');

// MongoDB URI (make sure you replace with your own MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/startup';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
});

// User model
const User = mongoose.model('User', userSchema);

// Functions to interact with the database

// Get a user by username
async function getUser(username) {
  return await User.findOne({ username });
}

// Create a new user
async function createUser(username, password) {
  try {
    // Create a new user document
    const user = new User({
      username,
      password, // Store hashed password
    });

    // Save the user to the database
    await user.save();

    console.log(`User created: ${user.username}`);
    return user; // Return the user object after creation

  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// Export the functions
module.exports = { getUser, createUser };

