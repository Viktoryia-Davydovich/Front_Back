const router = express.Router();
const NoteManager = require("../Services/NoteManager");
const noteManager = new NoteManager();

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
router.post("/notes", (request, response) => {
  console.log(request.body);
  const { title, content, tag } = request.body;

  if (!title) {
    response.status(400).send("Title is required");
  } else if (!content) {
    response.status(400).send("Content is required");
  } else {
    noteManager
      .addNote(title, content, tag)
      .then(id => response.status(201).send({ id: id }))
      .catch(error => {
        console.log(error.message);
        response.status(500).send(error.message);
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
