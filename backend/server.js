require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const customMiddleware = require("./middleware/customMiddleware");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const goalRoutes = require("./routes/goalRoutes");

// express app
const app = express();

const port = process.env.PORT || 3001;
connectDB();
bnbnvbnbbn;
// middlewarestart
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent cross-origin
  })
);
app.use(express.json());

app.use(customMiddleware.reqLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes

app.use("/api/user", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/goals", goalRoutes);



app.use(customMiddleware.unknownEndpoint);

app.use(customMiddleware.errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;