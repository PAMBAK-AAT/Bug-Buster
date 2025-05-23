



const express = require('express');
const router = express.Router();
const generateFile = require('../../generateFile');
const executeCpp = require('../../executeCpp');

router.post('/', async (req, res) => {
  const { language, code, input, expectedOutput } = req.body;

  if (!code || !language || expectedOutput === undefined) {
    return res.status(400).json({ error: 'Missing code, language, or expectedOutput' });
  }

  try {
    // 1. Generate file
    const filepath = await generateFile(language, code);

    // 2. Run the code with input
    const output = await executeCpp(filepath, input);

    // 3. Compare trimmed output
    const userOutput = output.trim();
    const expected = expectedOutput.trim();

    const verdict = userOutput === expected ? 'Correct' : 'Wrong Answer';

    return res.json({ output: userOutput, verdict });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
