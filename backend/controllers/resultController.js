const Result = require('../models/Result');
function grade(marks){ if(marks>=85) return 'A'; if(marks>=70) return 'B'; if(marks>=60) return 'C'; if(marks>=50) return 'D'; return 'F'; }
exports.getResults = async (req, res) => res.json(await Result.find().populate('student').sort({ createdAt: -1 }));
exports.addResult = async (req, res) => { const data = { ...req.body, grade: grade(Number(req.body.marks)) }; res.status(201).json(await Result.create(data)); };
exports.deleteResult = async (req, res) => { await Result.findByIdAndDelete(req.params.id); res.json({ message: 'Result deleted' }); };
