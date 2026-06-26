const router = require('express').Router();
const { getStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
router.get('/', getStudents); router.post('/', createStudent); router.put('/:id', updateStudent); router.delete('/:id', deleteStudent);
module.exports = router;
