var express = require("express");
const userRouter = require("./user");

var app = express();
app.use("/user/", userRouter);

module.exports = app;