



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

    const results = [];
    const filePath = generateFile(language, code);
    let verdict = "Accepted";

    for (let i = 0; i < testCases.length; i++) {

      const inputFilePath = generateInputFile(testCases[i].input);
      const output = await executeCpp(filePath, inputFilePath);

      const expectedOutput = testCases[i].output.trim();
      const userOutput = output.trim();

      const isPassed = userOutput === expectedOutput;
      results.push({
        testCase: i+1,
        verdict: isPassed? "Passed":"Failed",
        ...(isPassed? {} : { // it means push only in results if failed else do nothing
          input: testCases[i].input,
          expectedOutput,
          userOutput,
        })
      });

      if(!isPassed){
        verdict = "Wrong Answer";
        break; // stop the loop as soon as a test case fails. this will save time.
      };
    }
    
    return res.json({verdict, results  });

  } catch (err) {
    console.error("Error in submission:", err);
    res.status(500).json({ error: "Server error during submission" });
  }
});

module.exports = router;



