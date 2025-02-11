const { request, response } = require("express");
const User = require("../models/User");

const createUser = async (request, response) => {
  const { name, email } = request.body;
  try {
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const updateUser = async (request, response) => {
  const { name, email } = request.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { name, email },
      { new: true }
    );
    request.json(updatedUser);
  } catch (err) {
    request.status(400).json({ error: err.message });
  }
};

const deleteUser = async (request, response) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    response.json({ message: "User deleted" });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
