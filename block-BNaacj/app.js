const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017', (err) => {
  console.log(err ? err : 'Connected to Database');
});

const app = express();

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
