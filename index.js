const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
let todos = [];

app.get("/", (req, res) => {
  res.sendFile(path.resolve("views", "todo.html"));
});

app.post("/", (req, res) => {
  let { body } = req;
  console.log("body from html:", body);
  todos.push(body.todo);
  console.log("todo:", todos);
  res.redirect("/");
});
app.listen(8080, () => console.log("listening on port 8080"));
