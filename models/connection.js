const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  console.log(process.env.MONGODB_URI);
  mongoose.connect("mongodb://localhost:27017/tickets-ual");
};

module.exports = connectDB;