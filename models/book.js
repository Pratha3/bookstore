const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookUrl: {
    type: String,
    required: true,
  },
  bookDisc: {
    type: String,
    required: true,
  },
  bookPrice: {
    type: Number,
    required: true,
  },
});

const bookData = mongoose.model("book", bookSchema);
module.exports = bookData;
