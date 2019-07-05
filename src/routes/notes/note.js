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
  } catch (err) {
    console.log("err" + err);
    res.status(400).send(err);
  }
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
router.get("/notes/:id", (request, response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).send("Id is required");
  } else {
    noteManager
      .findNoteById(id)
      .then(note => response.json(note))
      .catch(error => {
        console.log(error.message);
        response.status(500).send();
      });
  }
});
router.get("/notes", (request, response) => {
  const { title, tag } = request.query;

  if (title) {
    noteManager
      .findNotesByTitle(title)
      .then(notes => response.json(notes))
      .catch(error => {
        console.log(error);
        response.status(500).send();
      });
  } else if (tag) {
    noteManager
      .findNotesByTag(tag)
      .then(notes => response.json(notes))
      .catch(error => {
        console.log(error);
        response.status(500).send();
      });
  } else {
    noteManager
      .listNotes()
      .then(notes => response.json(notes))
      .catch(error => {
        console.log(error);
        response.status(500).send();
      });
  }
});

router.put("/notes", (request, response) => {
  const { id, title, content, tag } = request.body.note;

  if (!id) {
    response.status(400).send("Id is required");
  } else if (!title) {
    response.status(400).send("Title is required");
  } else if (!content) {
    response.status(400).send("Content is required");
  } else {
    noteManager
      .updateNote(id, title, content, tag)
      .then(() => response.status(200).send())
      .catch(error => {
        console.log(error.message);
        response.status(500).send(error.message);
      });
  }
});

module.exports = router;
