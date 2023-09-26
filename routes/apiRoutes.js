const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();
const {
  readAndAppend,
  readFromFile,
  deleteFromFile,
} = require("../helpers/fsUtils");

// http:localhost:3001/api/notes
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// http:localhost:3001/api/notes
router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, "./db/db.json");
    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("New note could not be created");
  }
});

router.delete("/notes/:id", (req, res) => {
  const requestedId = req.params.id;
  if (requestedId) {
    deleteFromFile(requestedId, "./db/db.json");
    const response = {
      status: "Successfuly deleted.",
      body: requestedId,
    };
    res.json(response);
  } else {
    res.json("Note could not be deleted.");
  }
});

module.exports = router;
