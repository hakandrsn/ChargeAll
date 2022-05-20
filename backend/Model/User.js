const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userid: String,
  cardid: String,
  username: { type: String, unique: true },
  site: String,
  password: String,
  balance: {type:Number , default: 0},
  date: { type: Date, default: Date.now() },
  devices: Array,
  operations: Array,
  fills: Array
}, { versionKey: false, collection: "users", timestamps: true });


const User = mongoose.model("User", UserSchema);
module.exports = User;
