


const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const { mongoConnection } = require("./databases/db.js");
const User = require("./models/user.js");

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoConnection();

app.get('/', (req, res) => {
    res.send('I am fine...');
})

app.get("/register", (req, res) => {
  res.send(`
    <form action="/register" method="POST" style="padding: 50px; text-align: center;">
        <input type="text" name="firstName" placeholder="Enter first name" required /><br /><br />
        <input type="text" name="lastName" placeholder="Enter last name" required /><br /><br />
        <input type="email" name="email" placeholder="Enter email" required /><br /><br />
        <input type="password" name="password" placeholder="Enter password" required /><br /><br />
        <input type="password" name="confirmPassword" placeholder="Confirm password" required /><br /><br />
        <input type="tel" name="phoneNo" placeholder="Enter phone number" pattern="[6-9]{1}[0-9]{9}" required /><br /><br />
        <button type="submit">Register</button>
    </form>
  `);
});


app.post("/register", async (req, res) => {
    
    try {

        // get all data from the user
        const { firstName, lastName, email, password, confirmPassword, phoneNo } = req.body;

        // check if all data exist or not
        if(!(firstName && lastName && email && password && confirmPassword && phoneNo) ){
            return res.status(400).send("Please fill all fields correctly");
        }

        // check if email is valid or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // it ensures that email should have at least one character before @, one @, domain name.
        if(!emailRegex.test(email)){
            return  res.status(400).send("Please enter valid email");
        }

        // check if password is strong or not
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).send("Please enter a strong password...");
        }
        // check password and confirmPassword are same or not
        if(!(password === confirmPassword)){
            return res.status(400).send("Enter same password in confirmPassword as in password field");
        } 

        // check if phone no is valid or not
        const phoneRegex = /^[6-9]\d{9}$/;
        if(!phoneRegex.test(phoneNo)){
            return res.status(400).send("Enter valid phone no.");
        }

        // check if email already exist or not
        const isExist = await User.findOne({email});
        if(isExist){
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

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '5h'});
        user.token = token;

        await user.save();

        user.password = undefined;
        res.status(200).json({message: "User registered successfully...", user});

    } catch (error) {
        console.error("Error in registering the user: ", error);
    }
})


app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="POST" style="padding: 50px; text-align: center;">
            <input type="email" name="email" placeholder="enter email" required /> <br /> <br />
            <input type="password" name="password" placeholder="enter your password" required /> <br/> <br/>
            <button type="submit"> Login </button>
        </form>
    `)
})

app.post("/login", async (req, res) => {

    try {
        const {email, password} = req.body;

        // check all fields exist or not
        if(!email || !password){
            res.status(500).send("Complete your details...");
        }

        // find the existing user
        const existingUser = await User.findOne({email});
        if(!existingUser){
            res.status(401).send("Invalid email...");
        }

        // compare password of the current user
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordMatch){
            res.status(401).send("Invalid Password...");
        }

        const token = jwt.sign({_id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '5h'});

        existingUser.token = token;
        
        await existingUser.save();
        existingUser.password = undefined; // hide password in response;


        res.status(200).json({message: "User Login successfully", user: existingUser});

    } catch (error) {
        console.error("Login error", error);
        res.status(500).send("Something went wrong in Login the page.");
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port : ${process.env.PORT}`);
})