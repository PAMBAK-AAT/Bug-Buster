

const express = require('express');
const app = express();

const { mongoConnection } = require("./databases/db.js");
mongoConnection();

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Replace with your React frontend port

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = require('./middlewares/auth.js');
const { generateFile } = require('./generateFile.js');
const { generateInputFile } = require('./generateInputFile.js');
const { executeCpp } = require('./executeCpp.js');
const submitRoute = require('./routes/Problems/submit.js');

// Import route files for User API's
const registerRouter = require('./routes/User/register.js');
const loginRouter = require('./routes/User/login.js');
const profileRouter = require('./routes/User/profile.js');
// const submissionRouter = require('./routes/User/submission.js');
// const logoutRouter = require('./routes/User/logout.js');

// Import route files for Problem API's
const problemRouter = require('./routes/Problems/problem.js');



// User API's
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/',  profileRouter);
// app.use('/', logoutRouter);
// app.use('/', submissionRouter);



// Problem API's
app.use("/", problemRouter);

// app.use("/submit", submitRoute);

app.post('/runWithInput', async (req, res) => {
    const { code, language='cpp', input} = req.body;

    if (!code) {
        return res.status(400).json({ message: "Code not provided" });
    }

    try {
        const filePath = generateFile(language, code);
        const inputFilePath = generateInputFile(input);
        const output = await executeCpp(filePath, inputFilePath);
        res.json({ output });
    } catch (error) {
        console.error("Error during code execution:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});




app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port : ${process.env.PORT}`);
})