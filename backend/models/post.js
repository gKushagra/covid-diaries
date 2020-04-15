const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Post", postSchema);
