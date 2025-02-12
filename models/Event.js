const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  date: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
