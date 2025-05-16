

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoConnection = async () => {
    try {
        const MONGODB_URL = process.env.MONGO_URL;
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.error("Error in connecting with the mongoDB", error);
    }
}

module.exports = {mongoConnection};

