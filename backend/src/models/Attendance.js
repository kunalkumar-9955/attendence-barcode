const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  barcodeId: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  checkIn: {
    time: Date,
    device: String,
    browser: String,
    ip: String,
    location: {
      lat: Number,
      lng: Number,
      address: String
    },
    selfie: String
  },
  checkOut: {
    time: Date,
    device: String,
    browser: String,
    ip: String,
    location: {
      lat: Number,
      lng: Number,
      address: String
    },
    selfie: String
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day', 'on-leave', 'holiday', 'pending-checkout'],
    default: 'pending-checkout'
  },
  totalWorkMinutes: { type: Number, default: 0 },
  overtimeMinutes: { type: Number, default: 0 },
  lateMinutes: { type: Number, default: 0 },
  breakMinutes: { type: Number, default: 0 },
  shift: {
    name: String,
    startTime: String,
    endTime: String
  },
  isManuallyEdited: { type: Boolean, default: false },
  editHistory: [{
    editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    editedAt: { type: Date, default: Date.now },
    reason: String,
    previousCheckIn: Date,
    previousCheckOut: Date
  }],
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// Compound unique index: one attendance record per employee per date
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Calculate work hours before save
attendanceSchema.pre('save', function (next) {
  if (this.checkIn?.time && this.checkOut?.time) {
    const diffMs = new Date(this.checkOut.time) - new Date(this.checkIn.time);
    this.totalWorkMinutes = Math.max(0, Math.floor(diffMs / 60000) - (this.breakMinutes || 0));

    // Parse shift times
    if (this.shift?.startTime && this.shift?.endTime) {
      const dateStr = this.date;
      const shiftStart = new Date(`${dateStr}T${this.shift.startTime}:00`);
      const shiftEnd = new Date(`${dateStr}T${this.shift.endTime}:00`);
      const shiftDurationMin = (shiftEnd - shiftStart) / 60000;

      // Overtime
      if (this.totalWorkMinutes > shiftDurationMin) {
        this.overtimeMinutes = this.totalWorkMinutes - shiftDurationMin;
      }

      // Late check-in
      const lateThreshold = new Date(shiftStart.getTime() + 10 * 60000); // 10 min grace
      if (new Date(this.checkIn.time) > lateThreshold) {
        this.lateMinutes = Math.floor((new Date(this.checkIn.time) - shiftStart) / 60000);
        this.status = 'late';
      } else {
        this.status = 'present';
      }
    }
  }
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);
