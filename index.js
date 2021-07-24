const express = require("express");
const ejs = require("ejs");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
let todos = [];
app.get("/", (req, res) => {
  res.render("todo", { todos });
  res.end();
});
app.post("/", (req, res) => {
  let { body } = req;
  console.log("body from html:", body);
  todos.push(body.todo);
  console.log("todos:", todos);
  res.redirect("/");
});
app.listen(8080, () => console.log("listening on port 8080"));
