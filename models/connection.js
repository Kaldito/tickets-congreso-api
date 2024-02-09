const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(uri);
};

module.exports = connectDB;
