const router = require('express').Router();
const { getAttendance, markAttendance, deleteAttendance } = require('../controllers/attendanceController');
router.get('/', getAttendance); router.post('/', markAttendance); router.delete('/:id', deleteAttendance);
module.exports = router;
