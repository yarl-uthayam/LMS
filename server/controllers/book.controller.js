const Book = require('../models/book.model');
exports.getAllBooks = (req, res) => {
  const searchTerm = req.query.searchTerm;
  Book.find({
    $or: [
      { author: { $regex: searchTerm } },
      { title: { $regex: searchTerm } },
    ],
  })
    .then((books) => {
      res.status(200).json({
        message: 'Get all books Successfully',
        results: books,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.createBook = (req, res) => {
  const { title, author, subject, dateOfPublication, uniqueId } = req.body;
  Book.create({
    uniqueId,
    title,
    author,
    subject,
    dateOfPublication,
  })
    .then((response) =>
      res.status(201).json({
        message: 'book created Successfully',
        results: response,
      })
    )
    .catch((err) => {
      let errMsg;
      if (err.code == 11000) {
        errMsg = Object.keys(err.keyValue)[0] + ' already exists.';
      } else {
        errMsg = err.message;
      }
      res.status(400).json({ message: errMsg });
    });
};

exports.updateBook = (req, res) => {
  const { title, author, subject, dateOfPublication } = req.body;
  Book.findOneAndUpdate(
    { _id: req.params.id },
    {
      title,
      author,
      subject,
      dateOfPublication,
    }
  )
    .then((response) => {
      res.status(200).json({
        message: 'book updated Successfully',
        results: response,
      });
    })
    .catch((err) => {
      let errMsg;
      if (err.code == 11000) {
        errMsg = Object.keys(err.keyValue)[0] + ' already exists.';
      } else {
        errMsg = err.message;
      }
      res.status(400).json({ message: errMsg });
    });
};

exports.deleteBookById = (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json({
        message: 'book deleted Successfully',
        results: response,
      });
    })
    .catch((err) => {
      let errMsg;
      errMsg = err.message;
      res.status(400).json({ message: errMsg });
    });
};
