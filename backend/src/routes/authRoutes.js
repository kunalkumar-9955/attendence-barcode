const express = require('express');
const rateLimit = require('express-rate-limit');
const { register, login, getMe, forgotPassword, resetPassword, verifyEmail } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.get('/me', protect, getMe);

module.exports = router;
