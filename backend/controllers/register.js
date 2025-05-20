

const express = require('express');
const app = express();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const registerUser = async (req, res) => {

    try {

        // get all data from the user
        const { firstName, lastName, email, password, confirmPassword, phoneNo } = req.body;

        // check if all data exist or not
        if (!(firstName && lastName && email && password && confirmPassword && phoneNo)) {
            return res.status(400).send("Please fill all fields correctly");
        }

        // check if email is valid or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // it ensures that email should have at least one character before @, one @, domain name.
        if (!emailRegex.test(email)) {
            return res.status(400).send("Please enter valid email");
        }

        // check if password is strong or not
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send("Please enter a strong password...");
        }
        // check password and confirmPassword are same or not
        if (!(password === confirmPassword)) {
            return res.status(400).send("Enter same password in confirmPassword as in password field");
        }

        // check if phone no is valid or not
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phoneNo)) {
            return res.status(400).send("Enter valid phone no.");
        }

        // check if email already exist or not
        const isExist = await User.findOne({ email });
        if (isExist) {
            res.status(400).send("email already exist");
        }

        // Hashing of password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            phoneNo,
        })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.token = token;

        await user.save();

        user.password = undefined;
        res.status(200).json({ message: "User registered successfully...", user });

    } catch (error) {
        console.error("Error in registering the user: ", error);
    }

}

module.exports = {registerUser};