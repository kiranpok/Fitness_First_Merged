require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const customMiddleware = require("./middleware/customMiddleware");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");

// express app
const app = express();

const port = 3002;
connectDB();

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

app.use(customMiddleware.unknownEndpoint);

app.use(customMiddleware.errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
