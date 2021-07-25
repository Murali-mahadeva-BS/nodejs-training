require("dotenv").config();
const express = require("express");
const helment = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/todoModel");
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors({ origin: `http://localhost:${PORT}` }));
app.use(helment());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/todos", async (req, res) => {
  try {
    let todos = await Todo.find();
    res.status(200).json({
      isSuccesful: true,
      items: todos,
    });
  } catch (error) {
    console.log("Error in getting all todos");
    res.status(500).json({
      isSuccesful: false,
      error,
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let todo = await Todo.findById(id);
    res.status(200).json({
      isSuccesful: true,
      item: todo,
    });
  } catch (error) {
    console.log("Error in getting the todo");
    res.status(500).json({
      isSuccesful: false,
      error,
    });
  }
});

app.post("/todos", async (req, res) => {
  try {
    let todo = await new Todo(req.body);
    todo
      .save()
      .then(() => {
        console.log("Newly created todo:", todo);
        res.status(200).json({
          isSuccesful: true,
          item: todo,
        });
      })
      .catch((err) => {
        console.log("Error in creating new todo");
        res.status(500).json({
          isSuccesful: false,
          error,
        });
      });
  } catch (error) {
    console.log("Error in creating todo");
    res.status(500).json({
      isSuccesful: false,
      error,
    });
  }
});

app.delete("/todos/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let todo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      isSuccesful: true,
      item: todo,
    });
  } catch (error) {
    console.log("Error in deleting the todo");
    res.status(500).json({
      isSuccesful: false,
      error,
    });
  }
});

app.put("/todos/:id", async (req, res) => {
  let { id } = req.params;
  let { title } = req.body;
  try {
    let todo = await Todo.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      isSuccesful: true,
      item: todo,
    });
  } catch (error) {
    console.log("Error in updating the todo");
    res.status(500).json({
      isSuccesful: false,
      error,
    });
  }
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`listening on ${PORT} `));
  })
  .catch((err) => console.log("Error in DB connection:", err));
