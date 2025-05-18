

const express = require('express');
const app = express();

const { mongoConnection } = require("./databases/db.js");
mongoConnection();

const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Replace with your React frontend port

// Import route files
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes directly at root
app.use('/', registerRouter);
app.use('/', loginRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port : ${process.env.PORT}`);
})