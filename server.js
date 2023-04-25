const express = require('express');
const app = express();
const port = 3000;

const users = require('./db.json').users;

app.get('/users', (req, res) => {
  res.json({ users: users });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});