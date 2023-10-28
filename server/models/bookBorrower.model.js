const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookBorrowerSchema = new mongoose.Schema({
  userId: {
    type: schema.ObjectId,
    ref: 'user',
  },
  bookId: {
    type: schema.ObjectId,
    ref: 'book',
  },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, default: null },
  status: { type: String, default: 'loan', enum: ['loan', 'return'] },
});

module.exports = mongoose.model('bookBorrower', bookBorrowerSchema);
