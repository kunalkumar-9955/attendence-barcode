const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  address: String,
  city: String,
  country: String,
  phone: String,
  email: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Branch', branchSchema);
