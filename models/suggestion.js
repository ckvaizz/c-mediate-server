const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let suggestons = new Schema({
  userId: ObjectId,
  date: { type: Date, default: new Date() },
  status: { type: Boolean, default: true },

  message: String,
});

const model = mongoose.model("Suggestons", suggestons);

module.exports = model;
