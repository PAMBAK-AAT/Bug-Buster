
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Automatically converts the string to lowercase before saving to the database.
        trim: true, // Removes any leading whitespace before saving into the database
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String, // Store phone number as string to preserve leading zeros if any
        required: true,
        // match: /^[6-9]\d{9}$/  // Example for Indian 10-digit phone numbers
    },
    
}, {timestamps: true}); // timestamps field -> automatically added two fields createdAt(date and time when first created), updatedAt(date and time when first updated)

module.exports = mongoose.model("User", userSchema);
