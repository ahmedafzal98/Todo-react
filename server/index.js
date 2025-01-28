const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/todoModel");
const todoRoute = require("./routes/TodoRoute");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/todos", todoRoute);
const port = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("Hello From Node Js");
});
mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    console.log("Connected To Database");
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}`);
    });
  })
  .catch(() => {
    console.log("Failed To connect database");
  });
