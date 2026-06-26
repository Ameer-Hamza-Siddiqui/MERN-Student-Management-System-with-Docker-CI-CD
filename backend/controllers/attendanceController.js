const Attendance = require('../models/Attendance');
exports.getAttendance = async (req, res) => res.json(await Attendance.find().populate('student').sort({ createdAt: -1 }));
exports.markAttendance = async (req, res) => res.status(201).json(await Attendance.create(req.body));
exports.deleteAttendance = async (req, res) => { await Attendance.findByIdAndDelete(req.params.id); res.json({ message: 'Attendance removed' }); };
