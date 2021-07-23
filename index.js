const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
// app.set("views", __dirname + "/pages");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
  res.end();
});

app.listen(8080, () => console.log("server is listenig on port:", 8080));
