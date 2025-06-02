const Problem = require('../models/problem.model.js');
const User = require('../models/user.model.js');
const Submission = require('../models/submission.model.js');

const { generateFile } = require('../utils/generateFile.js');
const { generateInputFile } = require('../utils/generateInputFile.js');
const { executeCpp } = require('../utils/executeCpp.js');

const submitCode = async (req, res) => {
  try {
    const { code, language = 'cpp', problemId, userId } = req.body;

    if (!code || !problemId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const testCases = problem.testCases.filter(tc => tc.isHidden); // Use hidden test cases
    const results = [];

    const filePath = await generateFile(language, code);
    let verdict = "Accepted";

    for (let i = 0; i < testCases.length; i++) {
      const inputFilePath = await generateInputFile(testCases[i].input);
      const output = await executeCpp(filePath, inputFilePath);

      const expectedOutput = testCases[i].output.trim();
      const userOutput = output.trim();
      const isPassed = userOutput === expectedOutput;

      results.push({
        testCase: i + 1,
        verdict: isPassed ? "Passed" : "Failed",
        ...(isPassed ? {} : {
          input: testCases[i].input,
          expectedOutput,
          userOutput,
        })
      });

      if (!isPassed) {
        verdict = "Wrong Answer";
        break;
      }
    }

    const submission = new Submission({
      userId,
      problemId,
      code,
      verdict,
      submittedAt: new Date(),
    });

    await submission.save();

    if (verdict === "Accepted") {
      const alreadySolved = await Submission.exists({
        userId,
        problemId,
        verdict: "Accepted",
        _id: { $ne: submission._id },
      });

      if (!alreadySolved) {
        await User.findByIdAndUpdate(userId, { $inc: { noOfQuesSolved: 1 } });
      }
    }

    return res.json({ verdict, results });
  } catch (err) {
    console.error("Error in submission:", err);
    res.status(500).json({ error: "Server error during submission" });
  }
};

module.exports = { submitCode };
