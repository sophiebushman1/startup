const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const app = express();
const DB = require('./database.js');  // Assuming you have a database.js module for DB logic

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup - Allow frontend to make requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',  // Allow only this origin (your frontend URL)
  methods: ['GET', 'POST', 'OPTIONS'], // Allow GET, POST, OPTIONS methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true,  // Allow cookies and credentials to be sent along with requests
}));

// Handle preflight OPTIONS requests for CORS (for browsers sending non-simple requests)
app.options('*', cors());

// Serve static content (public folder)
app.use(express.static('public'));  // Serve your frontend files from the 'public' folder

// API Routes
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ msg: 'Username and password are required' });
    }

    const existingUser = await DB.getUser(username);
    if (existingUser) {
      return res.status(409).send({ msg: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before storing

    const newUser = await DB.createUser(username, hashedPassword);

    setAuthCookie(res, newUser.token);

    res.status(201).send({ msg: 'User created successfully', userId: newUser._id });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ msg: 'Server error. Please try again.' });
  }
});

// Helper function to set authentication cookie
function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,  // Cookie valid for 30 days
    httpOnly: true,  // Make cookie accessible only by the server (not client-side JS)
    secure: process.env.NODE_ENV === 'production',  // Only set secure cookie in production
  });
}

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
