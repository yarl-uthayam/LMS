const BookBorrower = require('../models/bookBorrower.model');
exports.getBorrowersByBookId = (req, res) => {
  const bookId = req.params.bookId;
  BookBorrower.find({ bookId })
    .populate('book')
    .populate('user')
    .then((bookBorrowers) => {
      res.status(200).json({
        message: 'Get Book Borrowers Successfully',
        results: bookBorrowers,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.createBookBorrower = (req, res) => {
  const { userId, bookId, borrowDate } = req.body;
  Book.create({
    userId,
    bookId,
    borrowDate,
  })
    .then((response) =>
      res.status(201).json({
        message: 'Book Borrower created Successfully',
        results: response,
      })
    )
    .catch((err) => {
      let errMsg;
      errMsg = err.message;
      res.status(500).json({ message: errMsg });
    });
};

exports.returnBook = (req, res) => {
  const id = req.params.id;
  const { bookId, userId, returnDate } = req.body;
  BookBorrower.findByIdAndUpdate(id, { bookId, userId, returnDate })
    .then((bookBorrower) => {
      res.status(200).json({
        message: 'Return Book Successfully',
        results: bookBorrower,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
