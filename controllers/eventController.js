import Event from "../models/Event.js";

export const createEvent = async (request, response) => {
  const { title, location, statistics, date, type, format } = request.body;

  try {
    const newEvent = new Event({
      title,
      location,
      statistics,
      date,
      type,
      format,
    });
    const savedEvent = await newEvent.save();
    response.status(201).json({ savedEvent });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

export const getAllEvents = async (request, response) => {
  try {
    const events = await Event.find()
      .populate("location")
      .populate("statistics");
    response.json(events);
  } catch (err) {
    console.error("Error in getAllEvents:", err);
    response.status(400).json({ error: err.message });
  }
};

export const updateEvent = async (request, response) => {
  const { title, location, statistics, date, type, format } = request.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      request.params.id,
      {
        title,
        location,
        statistics,
        date,
        type,
        format,
      },
      { new: true }
    );
    response.json(updatedEvent);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

export const deleteEvent = async (request, response) => {
  try {
    await Event.findByIdAndDelete(request.params.id);
    response.json({ message: "Event deleted" });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

export default { createEvent, getAllEvents, updateEvent, deleteEvent };
