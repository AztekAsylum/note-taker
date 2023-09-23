const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// app.get("/assets/css/styles.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"));
// });

// app.get("/assets/js/index.js", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
// });

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
  const newNote = {
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
