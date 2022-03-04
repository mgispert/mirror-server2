const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const entrySchema = new Schema({
  date: String,
  title: String,
  isFavourite: Boolean,
  grade: Number,
  grateful: String,
  emotion: {
    type: "string",
    enum: [
      "happy",
      "sad",
      "nothing",
      "tired",
      "proud",
      "excited",
      "anxious",
      "angry",
    ],
  },
  person: String,
  improvement: String,
  free: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Entry", entrySchema);
