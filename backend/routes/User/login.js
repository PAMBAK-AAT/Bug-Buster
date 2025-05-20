

const express = require('express');
const router = express.Router();
const { loginUser } = require('../../controllers/login.js');


router.post("/login", loginUser);

module.exports = router;
