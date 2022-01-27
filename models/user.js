const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let users = new Schema({
  name: String,
  mobile: Number,
  password: String,
  block: {type:Number,default:0},
  regDate: { type: Date, default: new Date() },
  role: { type: Number, default: 3 },
  status: { type: String, default: "active" },
  otp:String
});

const model = mongoose.model("Users", users);

module.exports = model;
