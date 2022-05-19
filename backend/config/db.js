const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB connected on :${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectDB;
