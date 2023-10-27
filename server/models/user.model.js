const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null, required: true },
  lastName: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true, unique: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
});

module.exports = mongoose.model('user', userSchema);
