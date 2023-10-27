const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config({
  path: 'server/config/config.env',
});
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
const bookRouter = require('./routes/book.route');
const userRouter = require('./routes/user.route');
app.use('/api', [bookRouter, userRouter]);

module.exports = app;
