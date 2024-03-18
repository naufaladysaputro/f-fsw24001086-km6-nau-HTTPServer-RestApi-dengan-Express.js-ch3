// const fs = require("fs");
const express = require("express");
const morgan = require("morgan");


const app = express();
const PORT = 8000;

const customRouter =  require("./routes/carRoutes")

// middleware untuk membaca json dari request body
app.use(express.json());

// middleware dari third party
app.use(morgan('dev'));

// middleware kita sendiri
app.use((req, res, next) => {
  console.log("Ping successfully");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const defaultRouter = (req, res, next) => {
  res.send("Ping successfully");
};


// // localhost:8000
app.get("/", defaultRouter);

app.use("/cars", customRouter);

module.exports = app;

// app.listen(PORT, () => {
//   console.log(`APP running on port : ${PORT}`);
// });