

const express = require('express');
const router = express.Router();

const { addProblem, getAllProblem } = require('../../controllers/problem.js');

// Route to get all problems

router.post('/addProblem', addProblem);
router.get('/problemList', getAllProblem);

module.exports = router;

