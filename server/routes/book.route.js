const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBookById,
} = require('../controllers/book.controller');

router.get('/books', getAllBooks);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBookById);
module.exports = router;
