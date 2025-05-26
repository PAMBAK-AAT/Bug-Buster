



const express = require('express');
const router = express.Router();
const { generateFile } = require('../../generateFile');
const { executeCpp } = require('../../executeCpp');
const { generateInputFile } = require('../../generateInputFile');
const Problem = require('../../models/problem.js');

router.post('/submit', async (req, res) => {
  try {
    const { code, language = 'cpp', problemId } = req.body;

    const problem = await Problem.findById(problemId);
    const testCases = problem.testCases.filter(tc => tc.isHidden);


    for (let i = 0; i < testCases.length; i++) {
      const inputFilePath = generateInputFile(testCases[i].input);
      const filePath = generateFile(language, code);
      const output = await executeCpp(filePath, inputFilePath);

      const expectedOutput = testCases[i].output.trim();
      const userOutput = output.trim();

      if (userOutput !== expectedOutput) {
        return res.json({
          output: userOutput,
          verdict: 'Wrong Answer',
          expectedOutput: expectedOutput,
          testCase: i + 1,
        });
      }
    }

    // All test cases passed
    res.json({
      verdict: "Accepted",
      message: "All test cases passed successfully!"
    });

  } catch (err) {
    console.error("Error in submission:", err);
    res.status(500).json({ error: "Server error during submission" });
  }
});

module.exports = router;



