


// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { loginUser, registerUser, logoutUser } = require('../controllers/auth.controller.js');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser); // optional

module.exports = router;
