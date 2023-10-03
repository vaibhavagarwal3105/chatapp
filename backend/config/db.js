const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://vaibhavaga007:y7aGFmAjTLUgZFrY@cluster0.vpwyir7.mongodb.net/"
, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;