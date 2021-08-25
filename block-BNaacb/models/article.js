const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
  name: String,
  author: String,
  views: Number,
});
