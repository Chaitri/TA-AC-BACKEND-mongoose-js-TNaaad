const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    content: { type: String, minlenght: 50, maxlength: 300 },
    author: { type: Schema.Types.ObjectID, required: true },
    article: { type: Schema.Types.ObjectID, required: true },
  },
  { timestamps: true }
);

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
