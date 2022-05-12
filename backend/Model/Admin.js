const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  adminid: { type: String, required: false },
  username: { type: String, required: false },
  password: { type: String, required: false },
  adsoyad: { type: String, required: false },
  site: { type: String, required: false },
  mail: { type: String, required: false },
  tel: { type: String, required: false },
  devices: { type:Array, required: false },
  lastlogin: {    type: Date,    default: Date.now,  },
});

module.exports = mongoose.model("Admin", ProductSchema);