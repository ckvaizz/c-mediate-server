const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let announcements = new Schema({
  title: String,
  message: String,
  addedDate: { type: Date, default: new Date() },
  dueDate: Date,
  
  pdf: {
    id:String,
    url:String
  },
});

const model = mongoose.model("Announcements", announcements);

module.exports = model;
