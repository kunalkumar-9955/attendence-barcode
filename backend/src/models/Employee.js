const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, unique: true, default: () => 'EMP' + Date.now().toString().slice(-6) },
  barcodeId: { type: String, unique: true, default: () => uuidv4() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  designation: { type: String, default: 'Employee' },
  avatar: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  dateOfBirth: Date,
  joiningDate: { type: Date, default: Date.now },
  shift: {
    name: { type: String, default: 'Morning' },
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '18:00' },
    breakMinutes: { type: Number, default: 60 }
  },
  salary: {
    hourlyRate: { type: Number, default: 0 },
    overtimeRate: { type: Number, default: 0 },
    lateDeductionRate: { type: Number, default: 0 }
  },
  isActive: { type: Boolean, default: true },
  punctualityScore: { type: Number, default: 100 },
  totalAttendanceDays: { type: Number, default: 0 },
  address: { type: String },
  emergencyContact: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

employeeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
