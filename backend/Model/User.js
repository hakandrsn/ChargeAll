const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: { type: String },
  cardid: { type: String },
  username: { type: String},
  site: { type: String},
  password: { type: String },
  balance: { type: Number },
  date: { type: Date, default: Date.now },
  devices: { type:Array },
  operations: { type: Array},
  fills: { type: Array},
});

module.exports = mongoose.model("users", UserSchema);