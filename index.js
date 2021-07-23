const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.write("hello world ");
  res.end();
});

app.listen(8080, () => console.log("server listening on port:", 8080));
