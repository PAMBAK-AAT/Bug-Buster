

const Problem = require('../models/problem');

const express = require('express');
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

const getProblemById = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = await Problem.findById(problemId);
        if(!problem){
            return res.status(404).json({message: "Problem not found"});
        }
        res.status(200).json({message: "Problem fetched successfully", problem});

    } catch (error) {
        console.error("Error in fetching the problem :", error);
        res.status(500).json({message: "Error in fetching problem", error});
    }
}

const updateProblem = async (req, res) => {
    
    try {
        const updates = req.body;
        const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, updates, {new: true});
        res.status(200).json({message: "Problem is updated by admin", updatedProblem});
    } catch (error) {
        console.error("Error in updating the problem", error);
        res.status(500).json({message: "Error in updating the user"});
    }

}

const deleteProblem = async (req, res) => {
    try{
        const deleted = await Problem.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json({message: "User deleted successfully"});
    }catch(error){
        console.error("Error in deleting the problem");
        res.status(500).json({message: "Error in deletion"});
    }
}


module.exports = {addProblem, getAllProblem, getProblemById, updateProblem, deleteProblem};