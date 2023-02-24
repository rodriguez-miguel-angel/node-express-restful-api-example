require('dotenv').config();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URL;

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { 
    useNewUrlParser: true 
});

export {mongoose};