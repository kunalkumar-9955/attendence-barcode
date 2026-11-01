const express = require('express');
const rateLimit = require('express-rate-limit');
const { scanBarcode, getMyAttendance, getTodayAttendance, getAttendanceLogs } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

const scanLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 25,
  message: { success: false, message: 'Too many scan attempts, please wait a moment.' }
});

router.post('/scan', protect, authorize('employee', 'admin'), scanLimiter, scanBarcode);
router.get('/my-history', protect, authorize('employee', 'admin'), getMyAttendance);
router.get('/today', protect, authorize('admin', 'manager'), getTodayAttendance);
router.get('/logs', protect, authorize('admin', 'manager'), getAttendanceLogs);

module.exports = router;
