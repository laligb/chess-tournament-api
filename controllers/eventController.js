const { request, response } = require("express");
const Event = require("../models/Event");

const createEvent = async (request, response) => {
  const { title, location, capacity, date } = request.body;

  try {
    const newEvent = new Event({ title, location, capacity, date });
    const savedEvent = await newEvent.save();
    response.status(201).json({ savedEvent });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const getAllEvents = async (request, response) => {
  try {
    const events = await Event.find();
    response.json(events);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const updateEvent = async (request, response) => {
  const { title, location, capacity, date } = request.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      request.params.id,
      {
        title,
        location,
        capacity,
        data,
      },
      { new: true }
    );
    request.json(updatedEvent);
  } catch (err) {
    request.status(400).json({ error: err.message });
  }
};

const deleteEvent = async (request, response) => {
  try {
    await Event.findByIdAndDelete(request.params.id);
    response.json({ message: "Event deleted" });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };
