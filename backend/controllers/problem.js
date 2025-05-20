

const Problem = require('../models/problem');


const addProblem = async (req, res) => {
    try {
        const { title, description, inputFormat, outputFormat, constraints, sampleInput, sampleOutput, tags, difficulty, timeLimit, memoryLimit, testCases} = req.body;
        // check if title, description, inputFormat, outputFormat, constraints, sampleInput, sampleOutput all are present or not
        if(!(title && description && inputFormat && outputFormat && constraints && sampleInput && sampleOutput)) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const problem = new Problem({
            title,
            description,
            inputFormat,
            outputFormat,
            constraints,
            sampleInput,
            sampleOutput,
            tags,
            difficulty,
            timeLimit,
            memoryLimit,
            testCases
        });

        await problem.save();
        res.status(201).json({message: "Problem added successfully", problem});

    } catch (error) {
        res.status(500).json({message: "Error in adding problem", error});
    }
}


const getAllProblem = async (req, res) => {
    try {
        const problems = await Problem.find({});
        res.status(200).json({message: "All problems fetched successfully", problems}); 
    } catch (error) {
        res.status(500).json({message: "Error in fetching problems", error});
    }
}

module.exports = {addProblem, getAllProblem};