import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: mongoose.Schema.ObjectId, ref: "Location", required: true },
  statistics: {
    type: mongoose.Schema.ObjectId,
    ref: "Statistics",
    required: true,
  },
  type: {
    type: String,
    enum: ["individual", "team"],
    required: true,
  },
  format: {
    type: String,
    enum: ["blitz", "rapid", "standard"],
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
