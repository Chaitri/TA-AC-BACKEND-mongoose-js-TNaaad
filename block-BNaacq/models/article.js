const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 1000 },
    tags: [String],
    likes: { type: Number, default: 0 },
    author: Schema.Types.ObjectID,
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
