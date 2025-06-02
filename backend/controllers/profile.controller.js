

const express = require('express');
const app = express();
const User = require('../models/user.model.js');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

const getProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select('-password'); // - sign tells that do not include password field in the return document.
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Server error in fetching the profile."});
    }
}

const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true}).select("-password");
        res.status(200).json({message: "User profile updated", updatedUser});
    } catch (error) {
        res.status(500).json({message: "Server error in updating the profile."});
    }
}

const deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error in deleting the profile"});
    }
}


module.exports = {getProfile, updateProfile, deleteProfile};