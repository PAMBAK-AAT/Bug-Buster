

const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/login.js');

// router.get("/login", (req, res) => {
//     res.send(`
//         <form action="/login" method="POST" style="padding: 50px; text-align: center;">
//             <input type="email" name="email" placeholder="enter email" required /> <br /> <br />
//             <input type="password" name="password" placeholder="enter your password" required /> <br/> <br/>
//             <button type="submit"> Login </button>
//         </form>
//     `)
// })

router.post("/login", loginUser);

module.exports = router;
