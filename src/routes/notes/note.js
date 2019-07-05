const express = require("express");
const router = express.Router();
const async = require("async");

const Note = require("../../models/Note");

router.post("/notes", async (request, response) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      createdDate: new Date(),
      updatedDate: new Date()
    });

    const saveNote = await newNote.save();
    response.json(saveNote);
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

router.get("/notes", async (request, response) => {
  try {
    const notes = await Note.find({});
    response.send(
      notes.map(note => {
        note.title, note.content, note.tag, note.createdDate, note.updatedDate;
      })
    );
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

router.get("/notes/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) {
      response.status(400).send("Id is required");
    } else {
      theNote = await Note.findOne(id);
      response.send(theNote);
    }
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

router.put("/notes", async (request, response) => {
  try {
    const editedNote = request.body.note;
    const updatedNote = await Note.update(
      { id: editedNote.id },
      {
        $set: {
          title: editedNote.title,
          content: editedNote.content,
          tags: editedNote.tag,
          updatedDate: editedNote.updatedDate
        }
      }
    );
    response.send(updatedNote);
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

router.delete("/notes/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedNote = await Note.findOneAndRemove(id);
    if (deletedNote) {
      res.status(204).send("Note successfully deleted");
    }
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

module.exports = router;
