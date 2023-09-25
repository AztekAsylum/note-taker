const express = require("express");
const path = require("path");
const fs = require("fs");
// helper method for generating unique ids
const { v4: uuidv4 } = require('uuid');
const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// http:localhost:3001/notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// http:localhost:3001/api/notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// http:localhost:3001/api/notes
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  console.log(newNote);

  fs.readFile("./db/db.json", "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    }

    const currentNotes = JSON.parse(data);

    currentNotes.push(newNote);

    console.log(currentNotes);

    fs.writeFile("./db/db.json", JSON.stringify(currentNotes), function (err) {
      if (err) {
        console.log(err);
      }
      res.send("Successful!");
    });
  });
});

app.listen(3005, () => {
  console.log("Server is now running!");
});
