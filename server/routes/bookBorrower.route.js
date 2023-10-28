const express = require('express');
const {
  getBorrowersByBookId,
  returnBook,
  createBookBorrower,
} = require('../controllers/bookBorrower.controller');
const router = express.Router();

router.post('/book-borrowers', createBookBorrower);
router.get('/book-borrowers/:bookId', getBorrowersByBookId);
router.get('/book-borrowers/:id', returnBook);
module.exports = router;
