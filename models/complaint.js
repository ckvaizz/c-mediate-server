const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let complaints = new Schema({
  userId: ObjectId,
  date: Date,
  report: Number,
  reply: String,
  message: String,
  status: { type: String, default: "active" },
  imageUrl: String,
});

const model = mongoose.model("Complaints", complaints);

module.exports = model;
