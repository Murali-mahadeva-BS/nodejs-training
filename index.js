require("dotenv").config();
const express = require("express");
const helment = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { Todo, sequelize } = require("./models");
const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: `http://localhost:${PORT}` }));
app.use(helment());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/todos", async (req, res) => {
  try {
    let todos = await Todo.findAll();
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

app.post("/todos", async (req, res) => {
  let { title } = req.body;
  try {
    let todo = await Todo.create({ title });
    console.log("Newly created todo:", todo);
    res.status(200).json({
      isSuccesful: true,
      item: todo,
    });
  } catch (error) {
    console.log("Error in creating todo");
    res.status(500).json({
      isSuccesful: false,
      error,
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let todo = await Todo.findOne({ where: { id } });
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

app.put("/todos/:id", async (req, res) => {
  let { id } = req.params;
  let { title } = req.body;
  try {
    let todo = await Todo.update({ title }, { where: { id } });
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

app.delete("/todos/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let todo = await Todo.destroy({ where: { id } });
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

app.listen(PORT, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("connected to database");
      console.log("listenign on port: ", PORT);
    })
    .catch((err) => console.log("Error in connecting to database"));
});
