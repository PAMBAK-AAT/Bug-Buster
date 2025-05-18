


const express = require('express');
const app = express();


const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check all fields exist or not
        if (!email || !password) {
            res.status(500).send("Complete your details...");
        }

        // find the existing user
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.status(401).send("Invalid email...");
        }

        // compare password of the current user
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            res.status(401).send("Invalid Password...");
        }

        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        existingUser.token = token;

        await existingUser.save();
        existingUser.password = undefined; // hide password in response;


        res.status(200).json({ message: "User Login successfully", user: existingUser });

    } catch (error) {
        console.error("Login error", error);
        res.status(500).send("Something went wrong in Login the page.");
    }
}

module.exports = {loginUser};