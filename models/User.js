const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
    trim: true, // Removes leading/trailing whitespaces
    minlength: 3, // Minimum username length
    maxlength: 30, // Maximum username length
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Password hashing middleware: Hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next(); // If password hasn't been modified, skip hashing
  }

  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed with saving the user
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Method to compare password (for login verification)
userSchema.methods.comparePassword = async function(plainPassword) {
  try {
    // Compare the plain password with the hashed password in the database
    return await bcrypt.compare(plainPassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
