const express = require("express");
const app = express();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("mediaupload");
  res.end();
});

app.post("/upload", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) return console.log("Error in parsing formdata");
    var oldpath = files.files.path;
    var newpath = path.resolve("media", files.files.name);
    fs.rename(oldpath, newpath, (err) => {
      if (err) return console.log("Error in saving file");
      console.log("File uploaded succesfully");
      res.redirect("/");
    });
  });
});
app.listen(8080, () => console.log("listening on port 8080"));

// {
//     "id":1,
//     "name":"murlai",
//     'password':'dljkflkd',
//     "books":[
//         {
//             "id":1,
//             "name":'name',
//             "author_id":2
//         },
//         {
//             "id":1,
//             "name":'name',
//             "author_id":2
//         },

//     ]
// }

// nodejs - server1
// postgres db - server2

// nodejs - server1
// mongodb db - server2
// mongodb db - server3
// mongodb db - server4
