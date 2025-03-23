// name = "blue bird", email = "bluebird@gmail.com", pass = "121234" - first user

const express = require("express");
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const logOutRouter = require("./routes/logOutRouter");
const path = require("path");
const newMessageRouter = require("./routes/newMessageRouter");
const adminFormRouter = require("./routes/adminFormRouter");
const deleteMessageRouter = require("./routes/deleteMessageRouter");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/log-out", logOutRouter);
app.use("/new-message", newMessageRouter);
app.use("/new-admin", adminFormRouter);
app.use("/delete-message/", deleteMessageRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});