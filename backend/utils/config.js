require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;
const JWT_SECRET =
  "464f439edc82b1340b854ec735490a109bf906937825adb31ba38e4dbd20869f0f3dc38ad49548d77a5907aebb8c8d43a93f43e863c57b5f8de260a8998ecf06"; // Add this line for JWT secret

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET, // Include JWT_SECRET in the exported object
};
