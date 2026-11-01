const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const { format } = require('date-fns');

// @desc    Scan Barcode to Check-in / Check-out
// @route   POST /api/attendance/scan
// @access  Private (Employee)
exports.scanBarcode = async (req, res) => {
  try {
    const { barcodeId, device, browser, ip, location, selfie } = req.body;
    
    // Find employee by barcode
    const employee = await Employee.findOne({ barcodeId, isActive: true });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Invalid Barcode or Employee not active.' });
    }

    const todayDate = format(new Date(), 'yyyy-MM-dd');

    // Find attendance record for today
    let attendance = await Attendance.findOne({ employee: employee._id, date: todayDate });

    const currentTime = new Date();
    const scanData = {
      time: currentTime,
      device,
      browser,
      ip: ip || req.ip,
      location,
      selfie
    };

    if (!attendance) {
      // First scan of the day -> Check-in
      attendance = new Attendance({
        employee: employee._id,
        barcodeId,
        date: todayDate,
        checkIn: scanData,
        shift: employee.shift
      });
      await attendance.save();
      
      return res.status(200).json({ 
        success: true, 
        type: 'check-in',
        message: `Welcome ${employee.firstName}! Check-in successful at ${format(currentTime, 'hh:mm a')}`,
        data: attendance 
      });
    } else if (!attendance.checkOut || !attendance.checkOut.time) {
      // Second scan -> Check-out
      // Prevent rapid scans (e.g. less than 1 min apart)
      const diffMinutes = (currentTime - new Date(attendance.checkIn.time)) / 60000;
      if (diffMinutes < 1) {
        return res.status(400).json({ success: false, message: 'Please wait before scanning again.' });
      }

      attendance.checkOut = scanData;
      await attendance.save(); // pre-save hook handles duration calculation

      return res.status(200).json({ 
        success: true, 
        type: 'check-out',
        message: `Goodbye ${employee.firstName}! Check-out successful at ${format(currentTime, 'hh:mm a')}. Worked: ${Math.floor(attendance.totalWorkMinutes / 60)}h ${attendance.totalWorkMinutes % 60}m`,
        data: attendance 
      });
    } else {
      // Already checked out
      return res.status(400).json({ 
        success: false, 
        message: 'You have already checked out for today.' 
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get employee's own attendance history
// @route   GET /api/attendance/my-history
// @access  Private (Employee)
exports.getMyAttendance = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee profile not found' });
    }

    const { month, year } = req.query;
    let query = { employee: employee._id };

    if (month && year) {
      const startDate = `${year}-${month.padStart(2, '0')}-01`;
      const endDate = `${year}-${month.padStart(2, '0')}-31`;
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendance = await Attendance.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get today's attendance for all employees
// @route   GET /api/attendance/today
// @access  Private (Admin)
exports.getTodayAttendance = async (req, res) => {
  try {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const attendance = await Attendance.find({ date: todayDate }).populate('employee', 'firstName lastName avatar employeeId department');
    
    // Also fetch all employees to determine absentees
    const allEmployees = await Employee.find({ isActive: true });
    
    const presentIds = attendance.map(a => a.employee._id.toString());
    const absentees = allEmployees.filter(emp => !presentIds.includes(emp._id.toString()));

    res.status(200).json({
      success: true,
      summary: {
        total: allEmployees.length,
        present: attendance.length,
        absent: absentees.length,
        late: attendance.filter(a => a.status === 'late').length
      },
      data: attendance,
      absentees
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get attendance logs for admin with filtering
// @route   GET /api/attendance/logs
// @access  Private (Admin)
exports.getAttendanceLogs = async (req, res) => {
  try {
    const { employeeName, employeeId, status, department, branch, startDate, endDate, page = 1, limit = 25 } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (employeeId || employeeName || department || branch) {
      const employeeFilters = {};
      if (employeeId) employeeFilters.employeeId = new RegExp(employeeId, 'i');
      if (employeeName) {
        const regex = new RegExp(employeeName, 'i');
        employeeFilters.$or = [{ firstName: regex }, { lastName: regex }];
      }
      if (department) employeeFilters.department = department;
      if (branch) employeeFilters.branch = branch;

      const matchingEmployees = await Employee.find(employeeFilters).select('_id');
      query.employee = { $in: matchingEmployees.map((emp) => emp._id) };
    }

    const total = await Attendance.countDocuments(query);
    const attendance = await Attendance.find(query)
      .populate('employee', 'firstName lastName employeeId department branch')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      count: attendance.length,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limit),
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
