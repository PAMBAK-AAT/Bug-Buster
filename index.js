
const express = require('express');
const app = express();

const { mongoConnection } = require("./databases/db.js");
mongoConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route files
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// Mount routes directly at root
app.use('/', registerRouter);
app.use('/', loginRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port : ${process.env.PORT}`);
})