

const mongoose = require('mongoose');
const { Schema } = mongoose;

const submissionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        
    },
    problemId:{
        type: Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Compilation Error', 'Runtime Error'],
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true});

module.exports = mongoose.model('Submission', submissionSchema);