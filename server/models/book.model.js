const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  title: { type: String, required: true },
  author: { type: String, required: true },
  subject: { type: String, default: null },
  dateOfPublication: { type: Date, default: null },
});

module.exports = mongoose.model('book', bookSchema);
