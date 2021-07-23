const http = require("http");
http
  .createServer((req, res) => {
    res.write("hello people");
    res.end();
  })
  .listen(8080);
console.log("Server listening on port :", 8080);
