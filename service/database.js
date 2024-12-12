const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("MongoDB connected successfully!");
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// Improved getUser function with error handling
function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      email: email,
      password: hashedPassword,
      token: uuid.v4(),  // Use UUID to generate a unique token
    };

    // Insert the user into the database
    const result = await userCollection.insertOne(user);
    
    console.log("User created:", result);  // Log user creation
    return result;  // Return the created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function addScore(score) {
  try {
    const result = await scoreCollection.insertOne(score);
    console.log("Score added:", result);
    return result;
  } catch (error) {
    console.error("Error adding score:", error);
    throw error;
  }
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
};
