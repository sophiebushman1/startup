//BACKEND

const express = require('express');
const app = express();
//using cors and making sure it works
const cors = require('cors');
app.use(cors());


const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(express.static('public'));

app.get('*', (_req, res) => {
  res.send({ msg: 'Service' });
});
//if that message doesn't work
app.get('/api/hello', (req, res) => {
  console.log('Frontend connected to /api/hello');
  res.json({ msg: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Listening on port${port}`);
});