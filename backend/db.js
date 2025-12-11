const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectToMongo;
