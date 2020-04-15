const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { dbkey } = require("./config");

const app = express();

const postsRoute = require("./backend/routes/posts");

// Connect to MongoDB
// mongoose.connect(
//   `mongodb+srv://gkushagra:${dbkey}@development-zqlw2.mongodb.net/test?retryWrites=true&w=majority`,
//   {
//     useMongoClient: true,
//   }
// );
mongoose.connect("mongodb://localhost:27017/covid-diaries-database", {
  useNewUrlParser: true,
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

// Routes to handle requests
app.use("/posts", postsRoute);

// Middleware if no matching routes are found
app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  next(error);
});

// Handle all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.sendFile(path.join(__dirname + "/error.html"));
});

module.exports = app;
