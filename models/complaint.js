const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let complaints = new Schema({
  userId: ObjectId,
  date: {type:Date,default:new Date()},
  report: {type:Number,default:0},
  reply: String,
  message: String,
  status: { type: String, default: "active" },
  image:{
    id:String,
    url:String
  },
});

const model = mongoose.model("Complaints", complaints);

module.exports = model;
