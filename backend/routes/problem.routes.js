


// routes/problem.routes.js
const express = require('express');
const router = express.Router();
const { addProblem, getAllProblem, getProblemById, updateProblem, deleteProblem } = require('../controllers/problem.controller.js');
const auth = require('../middlewares/auth.middleware.js');

router.get('/problemList', getAllProblem);
router.get("/problem/:id", getProblemById);
router.post('/admin/problem', addProblem); // TODO: add role check middleware later
router.put('/admin/problem/:id', auth, updateProblem);
router.delete('/admin/problem/:id', auth, deleteProblem);

module.exports = router;
