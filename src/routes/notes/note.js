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
  } catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
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
    console.log("err" + err);
    res.status(500).send(err);
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
    console.log("err" + err);
    res.status(500).send(err);
  }
});

router.put("/notes", async (request, response) => {
  const { id, title, content, tag } = request.body.note;
  noteManager
    .updateNote(id, title, content, tag)
    .then(() => response.status(200).send())
    .catch(error => {
      console.log(error.message);
      response.status(500).send(error.message);
    });
});

router.delete("/notes/:id", (request, response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).send("Title is required");
  } else {
    noteManager
      .removeNote(id)
      .then(() => response.status(200).send("Note deleted"))
      .catch(error => {
        console.log(error.message);
        response.status(500).send();
      });
  }
});

module.exports = router;
