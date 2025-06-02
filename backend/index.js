

// const express = require('express');
// const app = express();

// const { mongoConnection } = require("./config/db.js");
// mongoConnection();

// const cors = require('cors');
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })); // Replace with your React frontend port

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const auth = require('./middlewares/auth.middleware.js');
// const { generateFile } = require('./generateFile.js');
// const { generateInputFile } = require('./generateInputFile.js');
// const { executeCpp } = require('./executeCpp.js');
// const {aiCodeReview} = require('./aiCodeReview.js');
// const submitRoute = require('./routes/Problems/submit.js');

// // Import route files for User API's
// const registerRouter = require('./routes/User/register.js');
// const loginRouter = require('./routes/User/login.js');
// const profileRouter = require('./routes/User/profile.js');
// // const submissionRouter = require('./routes/User/submission.js');
// // const logoutRouter = require('./routes/User/logout.js');

// // Import route files for Problem API's
// const problemRouter = require('./routes/Problems/problem.js');
// const leaderboardRouter = require('./controllers/leaderboard.controller.js');


// app.get("/", (req, res) => {
//     res.json({message: 'compiler is online'});
// })

// // User API's
// app.use('/', registerRouter);
// app.use('/', loginRouter);
// app.use('/',  profileRouter);


// // Problem API's
// app.use("/", problemRouter);

// app.use("/", submitRoute);

// app.use("/", leaderboardRouter);

// app.post('/runWithInput', async (req, res) => {
//     const { code, language='cpp', input} = req.body;

//     if (!code) {
//         return res.status(400).json({ message: "Code not provided" });
//     }

//     try {
//         const filePath = generateFile(language, code);
//         const inputFilePath = generateInputFile(input);
//         const output = await executeCpp(filePath, inputFilePath);
//         res.json({ output });
//     } catch (error) {
//         console.error("Error during code execution:", error);
//         res.status(500).json({ message: "Internal server error", error });
//     }
// });

// app.post("/ai-review", async (req, res) => {

//     const { code, prompt } = req.body;
//     if(!code?.trim() || !prompt?.trim()){
//         return res.status(400).json({
//             success: false,
//             error: "Code & prompt are required..."
//         });
//     }
//     try {
//         const reviewText = await aiCodeReview(code, prompt);
//         res.send(reviewText);
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: "Internal server error"
//         })
//     }

// })




// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });





const express = require('express');
const app = express();
require('dotenv').config();

const { mongoConnection } = require("./config/db.js");
mongoConnection();

const cors = require('cors');
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route files
const authRoutes = require('./routes/auth.routes.js');
const profileRoutes = require('./routes/profile.routes.js');
const problemRoutes = require('./routes/problem.routes.js');
const submissionRoutes = require('./routes/submission.routes.js');

// Utility functions
const { generateFile } = require('./utils/generateFile.js');
const { generateInputFile } = require('./utils/generateInputFile.js');
const { executeCpp } = require('./utils/executeCpp.js');
const { aiCodeReview } = require('./utils/aiCodeReview.js');

// Leaderboard Controller (assumed to be a router)
const leaderboardRoutes = require('./controllers/leaderboard.controller.js');

// Health check
app.get("/", (req, res) => {
    res.json({ message: 'Compiler is online' });
});

// API Routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", problemRoutes);
app.use("/api", submissionRoutes);
app.use("/api", leaderboardRoutes);

// Raw code execution
app.post('/api/runWithInput', async (req, res) => {
    const { code, language = 'cpp', input } = req.body;

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

// AI Code Review Endpoint
app.post("/api/ai-review", async (req, res) => {
    const { code, prompt } = req.body;
    if (!code?.trim() || !prompt?.trim()) {
        return res.status(400).json({
            success: false,
            error: "Code & prompt are required..."
        });
    }

    try {
        const reviewText = await aiCodeReview(code, prompt);
        res.send(reviewText);
    } catch (error) {
        console.error("AI Review Error:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
