const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, requiered: true },
  email: { type: String, requiered: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
