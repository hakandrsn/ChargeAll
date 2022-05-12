const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  deviceid: { type: String},
  location: { type: String},
  site: { type: String},
  type: { type: String},
  date: { type: Date, default: Date.now },
  allowedsites: { type:Array },
  operations: { type: Array },
  state: { type: String },
  price: { type: Number},
  charginguser: { type: String },
  mobilecharging: { type: String },
});

module.exports = mongoose.model("Device", UserSchema);