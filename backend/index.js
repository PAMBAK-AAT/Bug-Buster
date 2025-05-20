

const express = require('express');
const app = express();

const { mongoConnection } = require("./databases/db.js");
mongoConnection();

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Replace with your React frontend port

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Import route files for User API's
const registerRouter = require('./routes/User/register.js');
const loginRouter = require('./routes/User/login.js');
const profileRouter = require('./routes/User/profile.js');
const submissionRouter = require('./routes/User/submission.js');
const logoutRouter = require('./routes/User/logout.js');

// User API's
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', profileRouter);
// app.use('/', logoutRouter);
// app.use('/', submissionRouter);


// Import route files for Problem API's
const problemRouter = require('./routes/Problems/problem.js');

// Problem API's
app.use("/", problemRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port : ${process.env.PORT}`);
})