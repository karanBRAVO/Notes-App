const MONGOOSE = require("mongoose");

const SCHEMA = new MONGOOSE.Schema({
  note_title: {
    type: String,
    required: true,
  },
  note_desc: {
    type: String,
    required: true,
  },
  note_date: {
    type: String,
    required: true,
  },
});

const MODEL = new MONGOOSE.model("myNotes", SCHEMA);

module.exports = MODEL;
