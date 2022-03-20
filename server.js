const mongoose = require("mongoose");
// const { DB_PASS } = process.env;
const cors = require("cors");
const express = require("express");
const app = express();

const todoRoute = require("./routes/todo");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/auth");

app.use(cors());
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/todos", todoRoute);

const port = 6400;
// let k = `mongodb+srv://omg9800:omg123@cluster0.7v2t2.mongodb.net/todo?retryWrites=true&w=majority`;

// let l = `mongodb://localhost:27017/todo`;

mongoose
  .connect(
    `mongodb+srv://op9800:PFSJJMrJcm6BkjpW@cluster0.rft6b.mongodb.net/todo?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("connected");
    });
  })
  .catch((e) => console.log(e.message));

module.exports = app;
