const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let regitrationNumbers = new Schema({
  name: String,
  mobile: Number,
});

const model = mongoose.model("RegitrationNumbers", regitrationNumbers);

module.exports = model;
