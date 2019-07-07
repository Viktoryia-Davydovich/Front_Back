const express = require("express");
const router = express.Router();
const async = require("async");

const Note = require("../models/Note");

router.post("/add", async (request, response) => {
  try {
    const newNote = new Note({
      title: request.body.title,
      content: request.body.content,
      tag: request.body.tag,
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

router.get("/", async (request, response) => {
  try {
    const notes = await Note.find({});
    console.log(notes);
    response.json(notes);
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    theNote = await Note.findOne({ _id: id });
    response.json(theNote);
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

router.put("/", async (request, response) => {
  try {
    const editedNote = request.body.note;
    theNote = await Note.findOne({ _id: editedNote._id });
    const updatedNote = await theNote.update({
      $set: {
        title: editedNote.title,
        content: editedNote.content,
        tag: editedNote.tag,
        updatedDate: editedNote.updatedDate
      }
    });
    response.json(updatedNote);
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedNote = await Note.findOneAndRemove(id);
    if (deletedNote) {
      response.status(204).send("Note successfully deleted");
    }
  } catch (error) {
    console.log("err" + error);
    response.status(500).send(error);
  }
});

module.exports = router;
