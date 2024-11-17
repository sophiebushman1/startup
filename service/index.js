const express = require('express');
const cors = require('cors');  // Make sure cors is required
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Enable CORS for all routes
app.use(cors());  // Add this line

// Serve static files from the public directory
app.use(express.static('public'));

// Example endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from your backend!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
