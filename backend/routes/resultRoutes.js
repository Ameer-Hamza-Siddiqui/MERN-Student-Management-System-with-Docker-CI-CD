const router = require('express').Router();
const { getResults, addResult, deleteResult } = require('../controllers/resultController');
router.get('/', getResults); router.post('/', addResult); router.delete('/:id', deleteResult);
module.exports = router;
