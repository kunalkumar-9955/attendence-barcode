const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { createLeaveRequest, getLeaveRequests, updateLeaveStatus } = require('../controllers/leaveController');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getLeaveRequests)
  .post(authorize('employee'), createLeaveRequest);

router.put('/:id/status', authorize('admin', 'manager'), updateLeaveStatus);

module.exports = router;
