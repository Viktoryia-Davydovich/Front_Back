const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  id: ObjectID,
  title: String,
  content: String,
  tag: Boolean,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const Note = mongoose.model("notes", NoteSchema);

module.exports = Note;
