const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  totalMarks: { type: Number, default: 100 },
  grade: String
}, { timestamps: true });
module.exports = mongoose.model('Result', resultSchema);
