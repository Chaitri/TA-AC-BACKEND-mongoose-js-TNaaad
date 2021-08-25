const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addressSchema = new Schema({
  village: String,
  city: String,
  state: String,
  pin: Number,
  user: Schema.Types.ObjectId,
});
