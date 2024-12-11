const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the application's static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  try {
    console.log("Received data:", req.body);  // Log the request body to inspect what's being sent

    // Check if the user already exists
    const existingUser = await DB.getUser(req.body.email);
    if (existingUser) {
      console.log("User already exists:", req.body.email);
      return res.status(409).send({ msg: 'Existing user' }); // Conflict: User already exists
    }

    // Create the new user
    const user = await DB.createUser(req.body.email, req.body.password);
    console.log("User created:", user); // Log user creation details

    setAuthCookie(res, user.token); // Set the authentication cookie
    return res.send({
      id: user._id,
      msg: 'User created successfully',
    });
  } catch (err) {
    console.error("Error creating user:", err);  // Log the error for debugging
    return res.status(500).send({ msg: 'Internal server error', error: err.message });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  try {
    console.log("Login attempt:", req.body);  // Log login attempt

    const user = await DB.getUser(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      return res.send({ id: user._id });
    }
    return res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).send({ msg: 'Internal server error', error: err.message });
  }
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetScores
secureApiRouter.get('/scores', async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
secureApiRouter.post('/score', async (req, res) => {
  const score = { ...req.body, ip: req.ip };
  await DB.addScore(score);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// Default error handler
app.use(function (err, req, res, next) {
  console.error("Global error handler:", err);  // Log uncaught errors
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// MongoDB connection setup
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');  // MongoDB credentials
const url = `mongodb+srv://${config.userName}:${encodeURIComponent(config.password)}@${config.hostname}`;

async function testMongoDBConnection() {
  try {
    const client = new MongoClient(url);
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("MongoDB connected successfully!");
    await client.db('admin').command({ ping: 1 });
    console.log("Ping successful, database is responsive.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);  // Exit if MongoDB connection fails
  }
}

// Test the connection when the server starts
testMongoDBConnection();
