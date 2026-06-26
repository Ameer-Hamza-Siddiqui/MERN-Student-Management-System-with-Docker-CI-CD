const Student = require('../models/Student');
exports.getStudents = async (req, res) => {
  const q = req.query.search || '';
  const students = await Student.find({ $or: [ { name: { $regex: q, $options: 'i' } }, { rollNo: { $regex: q, $options: 'i' } }, { department: { $regex: q, $options: 'i' } } ] }).sort({ createdAt: -1 });
  res.json(students);
};
exports.createStudent = async (req, res) => res.status(201).json(await Student.create(req.body));
exports.updateStudent = async (req, res) => res.json(await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.deleteStudent = async (req, res) => { await Student.findByIdAndDelete(req.params.id); res.json({ message: 'Student deleted' }); };
