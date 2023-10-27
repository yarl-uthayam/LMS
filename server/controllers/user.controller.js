const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
  User.find({ role: 'user' })
    .then((results) => {
      res.status(200).json({
        message: 'Get all users Successfully',
        results,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error found',
        error,
      });
    });
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  User.create({
    firstName,
    lastName,
    email,
  })
    .then((response) =>
      res.status(201).json({
        message: 'User created Successfully',
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
