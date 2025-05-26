

const mongoose = require('mongoose');
const { Schema } = mongoose;

const problemSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    inputFormat: {
        type: String,
        required: true,
    },
    outputFormat: {
        type: String,
        required: true,
    },
    constraints: {type: String, required: true},
    sampleInput: {type: String, required: true},
    sampleOutput: {type: String, required: true},
    tags: { type: [String]}, // Array of strings
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Only allow these values
    },
    timeLimit: {
        type: Number,
        default: 2, // Default time limit in seconds
    },
    memoryLimit: {
        type: Number,
        default: 256, // Default memory limit in MB
    },
    testCases: [
        {
            input: {type: String, required: true},
            output: {type: String, required: true},
            isHidden: { type: Boolean, default: true},
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model("Problem", problemSchema);