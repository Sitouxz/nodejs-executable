// app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, this is an executable Node.js app!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
