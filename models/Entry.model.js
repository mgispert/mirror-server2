const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const entrySchema = new Schema({
  date: String,
  title: String,
  grade: Number,
  grateful: String,
  emotion: [String],
  person: String,
  improvement: String,
  compliment: String,
  lookingForward: String,
  inspiration: String,
  need: String,
  free: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  imageURL: String,
});

module.exports = model("Entry", entrySchema);
