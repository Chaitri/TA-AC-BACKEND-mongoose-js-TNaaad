const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/sample', (err) => {
  console.log(err ? err : 'Connected to database');
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is up.');
});

app.post('/users', (req, res, next) => {
  let userData = req.body;
  User.create(userData, (err, userDoc) => {
    if (err) next(err);
    else res.send(`User ${userDoc.name} has been successfully saved.`);
  });
});

app.get('/users', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) next(err);
    else res.json({ users: users });
  });
});

app.get('/users/:id', (req, res, next) => {
  let id = req.params.id;

  // Using .find()
  User.find({ _id: id }, (err, user) => {
    if (err) next(err);
    else res.json(user);
  });

  // Using .findOne()
  User.findOne({ _id: id }, (err, user) => {
    if (err) next(err);
    else res.json(user);
  });

  // Using .findById()
  User.findById(id, (err, user) => {
    if (err) next(err);
    else res.json(user);
  });

  //   find() will return all documents which match the given query. findOne() will return only the first document which matches the query. findById() only allows to query with a id.
});

app.put('/users/:id', (req, res, next) => {
  let id = req.params.id;
  let newData = req.body;

  // .updateOne
  User.updateOne({ _id: id }, newData, { new: true }, (err, updateInfo) => {
    if (err) next(err);
    else if (updateInfo.acknowledged)
      res.send('User details have been successfully updated!');
    else res.send('Update failed :(');
  });

  // .findByIdAndUpdate()
  User.findByIdAndUpdate(id, newData, { new: true }, (err, updatedUser) => {
    if (err) next(err);
    else res.json(updatedUser);
  });
});

app.delete('/users/:id', (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndDelete(id, (err, deletedUser) => {
    if (err) next(err);
    else
      res.send(
        `${deletedUser.name}'s details have been removed from our database.`
      );
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
