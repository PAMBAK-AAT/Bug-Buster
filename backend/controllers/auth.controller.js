



const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, phoneNo } = req.body;

    if (!(firstName && lastName && email && password && confirmPassword && phoneNo)) {
      return res.status(400).send("Please fill all fields correctly");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Please enter a valid email");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send("Please enter a strong password...");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Confirm password does not match");
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNo)) {
      return res.status(400).send("Enter a valid phone number.");
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      phoneNo,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
    user.token = token;

    await user.save();
    user.password = undefined;

    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error in registering the user: ", error);
    res.status(500).send("Internal server error");
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Please provide email and password");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).send("Invalid email");
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

    existingUser.token = token;
    await existingUser.save();
    existingUser.password = undefined;

    res.status(200).json({ message: "User logged in successfully", token, user: existingUser });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).send("Internal server error");
  }
};


const logoutUser = async (req, res) => {
  try {
    // You can invalidate token on client side — or implement token blacklisting (advanced)
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error", error);
    res.status(500).send("Internal server error");
  }
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
