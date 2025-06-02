



// routes/submission.routes.js
const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller.js');

router.post('/submit', submissionController.submitCode);

module.exports = router;
