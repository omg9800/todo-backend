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
mongoose
  .connect(`mongodb://localhost:27017/todo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("connected");
    });
  })
  .catch((e) => console.log(e));

module.exports = app;
