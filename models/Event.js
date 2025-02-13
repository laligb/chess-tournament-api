const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: mongoose.Schema.ObjectId, ref: "Location", required: true },
  statistics: {
    type: mongoose.Schema.ObjectId,
    ref: "Statistics",
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
