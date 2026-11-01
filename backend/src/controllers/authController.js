const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Employee = require('../models/Employee');

const createToken = () => crypto.randomBytes(32).toString('hex');

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email settings are not fully configured. Skipping email delivery.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Email failed to send:', error.message);
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const autoVerifyUsers = process.env.NODE_ENV !== 'production' || process.env.AUTO_VERIFY_USERS === 'true';

// @desc    Register user (Admin or Employee)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const verificationToken = createToken();
    const verificationExpires = Date.now() + 60 * 60 * 1000;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || 'employee',
      isVerified: autoVerifyUsers,
      verificationToken,
      verificationExpires,
    });

    if (user.role === 'employee') {
      await Employee.create({
        user: user._id,
        firstName,
        lastName,
        email,
      });
    }

    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/verify/${verificationToken}`;

    if (!autoVerifyUsers) {
      await sendEmail({
        to: user.email,
        subject: 'Verify Your Email for SmartWorkforce',
        html: `<p>Hi ${user.firstName},</p><p>Please verify your email address by clicking the link below:</p><p><a href="${verificationUrl}">Verify My Email</a></p><p>This link expires in 60 minutes.</p>`,
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      message: autoVerifyUsers ? 'Account created successfully' : 'Account created. Please check your email to verify your account.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Your account has been deactivated' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: 'Please verify your email address before logging in.' });
    }

    user.lastLogin = Date.now();
    await user.save();

    let employeeData = null;
    if (user.role === 'employee') {
      employeeData = await Employee.findOne({ user: user._id }).select('barcodeId employeeId');
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        employeeId: employeeData ? employeeData.employeeId : null,
        barcodeId: employeeData ? employeeData.barcodeId : null,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    let employeeData = null;

    if (user.role === 'employee') {
      employeeData = await Employee.findOne({ user: user._id });
    }

    res.status(200).json({
      success: true,
      user,
      employee: employeeData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify email token
// @route   GET /api/auth/verify-email/:token
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Verification token is invalid or has expired.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Email successfully verified. You can now log in.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send password reset token
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found with that email address.' });
    }

    const resetToken = createToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Reset your SmartWorkforce password',
      html: `<p>Hi ${user.firstName},</p><p>Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 60 minutes.</p>`,
    });

    res.status(200).json({ success: true, message: 'Password reset instructions have been sent to your email.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ success: false, message: 'Token and new password are required.' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Reset token is invalid or has expired.' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

