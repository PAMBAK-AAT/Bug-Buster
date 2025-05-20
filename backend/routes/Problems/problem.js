

const express = require('express');
const router = express.Router();

const { addProblem, getAllProblem, getProblemById, updateProblem, deleteProblem } = require('../../controllers/problem.js');

const auth = require("../../middlewares/auth.js");
const roleCheck = require("../../middlewares/role.js");

// Route to get all problems

router.get('/problemList',  getAllProblem);
router.get("/problem/:id", getProblemById);

router.post('/admin/problem', auth, roleCheck, addProblem); // LATER on provide isAdmin as admin
router.put('/admin/problem/:id', auth,roleCheck, updateProblem);
router.delete('/admin/problem/:id', auth, roleCheck, deleteProblem);

module.exports = router;

