const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');
const AdminLog = require('../models/AdminLog');

exports.createLeaveRequest = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee profile not found.' });
    }

    const { leaveType, startDate, endDate, reason, attachments } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, message: 'Please provide all required leave request fields.' });
    }

    const leaveRequest = await LeaveRequest.create({
      employee: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
      attachments: attachments || []
    });

    res.status(201).json({ success: true, data: leaveRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLeaveRequests = async (req, res) => {
  try {
    const query = {};

    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ user: req.user.id });
      if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee profile not found.' });
      }
      query.employee = employee._id;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    const leaveRequests = await LeaveRequest.find(query)
      .populate({ path: 'employee', select: 'firstName lastName employeeId department branch' })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: leaveRequests.length, data: leaveRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, reviewNote } = req.body;
    const validStatuses = ['approved', 'rejected', 'pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) {
      return res.status(404).json({ success: false, message: 'Leave request not found.' });
    }

    leaveRequest.status = status;
    leaveRequest.reviewNote = reviewNote || leaveRequest.reviewNote;
    leaveRequest.reviewedBy = req.user.id;
    leaveRequest.reviewedAt = Date.now();
    await leaveRequest.save();

    await AdminLog.create({
      admin: req.user.id,
      action: `${status.charAt(0).toUpperCase() + status.slice(1)} leave request`,
      resource: 'LeaveRequest',
      resourceId: leaveRequest._id,
      details: { status, reviewNote },
      ip: req.ip,
      userAgent: req.headers['user-agent'] || ''
    });

    res.status(200).json({ success: true, data: leaveRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
