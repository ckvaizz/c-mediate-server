var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var mongodb = require("./config/mongoConnection");

//REQUIRE ROUTERS

var adminRouter = require("./routes/admin");
var userRouter = require("./routes/users");
var complaintRouter = require("./routes/complaint");
var suggestionRouter = require("./routes/suggestion");
var announcementRouter = require("./routes/announcement");
var authRouter = require("./routes/auth");

mongodb.connect();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/suggestion", suggestionRouter);
app.use("/api/announcement", announcementRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ err: "not found" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
