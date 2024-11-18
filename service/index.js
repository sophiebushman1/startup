//BACKEND

const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(express.static('public'));

app.get('*', (_req, res) => {
  res.send({ msg: 'Service' });
});

app.listen(port, () => {
  console.log(`Listening on port${port}`);
});