



const express = require('express');
const router = express.Router();
const { submitCode } = require('../controllers/submission.controller.js');

router.post('/submit', submitCode);

module.exports = router;
