const express = require('express');
const { getEmployees, getEmployee, updateEmployee } = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'manager'));

router.route('/')
  .get(getEmployees);

router.route('/:id')
  .get(getEmployee)
  .put(updateEmployee);

module.exports = router;
