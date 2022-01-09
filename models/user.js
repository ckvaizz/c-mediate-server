const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let users = new Schema({
  name: String,
  mobile: Number,
  password: String,
  block: Number,
  reqDate: { type: Date, default: new Date() },
  role: { type: Number, default: 3 },
  status: { type: String, default: "active" },
});

const model = mongoose.model("Users", users);

module.exports = model;
