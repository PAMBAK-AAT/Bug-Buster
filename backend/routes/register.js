

const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/register.js');


// router.get('/register', (req, res) => {
//     res.send(`
//     <form action="/register" method="POST" style="padding: 50px; text-align: center;">
//         <input type="text" name="firstName" placeholder="Enter first name" required /><br /><br />
//         <input type="text" name="lastName" placeholder="Enter last name" required /><br /><br />
//         <input type="email" name="email" placeholder="Enter email" required /><br /><br />
//         <input type="password" name="password" placeholder="Enter password" required /><br /><br />
//         <input type="password" name="confirmPassword" placeholder="Confirm password" required /><br /><br />
//         <input type="tel" name="phoneNo" placeholder="Enter phone number" pattern="[6-9]{1}[0-9]{9}" required /><br /><br />
//         <button type="submit">Register</button>
//     </form>
//   `);
// })

router.post('/register', registerUser);

module.exports = router;