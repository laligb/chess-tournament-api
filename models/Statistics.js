const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  players: { type: Number, default: 0, required: true },
  wins: { type: Number, default: 0, required: true },
  losses: { type: Number, default: 0, required: true },
  draws: { type: Number, default: 0, required: true },
  games: { type: Number, default: 0, required: true },
});

const Statistics = mongoose.model("Statistics", StatsSchema);
module.exports = Statistics;
