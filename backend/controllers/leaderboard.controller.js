


const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/user.model");

router.get("/leaderboard", async (req, res) => {

    try {
        const users = await User.find({})
            .sort({noOfQuesSolved: -1, createdAt: 1})
            .select("firstName lastName noOfQuesSolved createdAt")
            .lean();
        return res.json(users);
    } catch (error) {
        res.status(500).json({message: "Error in getting board data", error: error.message});
    }
})

module.exports = router;