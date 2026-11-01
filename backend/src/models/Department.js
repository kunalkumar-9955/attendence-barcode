const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, unique: true },
  description: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  color: { type: String, default: '#6366f1' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Department', departmentSchema);
