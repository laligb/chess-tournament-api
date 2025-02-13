const mongoose = require("mongoose");
const faker = require("faker");
const Statistics = require("../models/Statistics");
const Location = require("../models/Location");
const Event = require("../models/Event");

const getRandomTournamentName = () => {
  const tournaments = [
    "Grandmaster Showdown",
    "World Chess Open",
    "International Chess Masters",
    "Rapid Chess Championship",
    "Blitz Masters Cup",
    "Chess Legends Invitational",
    "King's Gambit Tournament",
    "Rook's Endgame Challenge",
    "Queen's Gambit Classic",
    "Bobby Fischer Memorial",
  ];
  return tournaments[Math.floor(Math.random() * tournaments.length)];
};

const mockData = async () => {
  try {
    const numEvents = 10;
    for (let i = 0; i < numEvents; i++) {
      const location = new Location({
        name: faker.address.country(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      });
      await location.save();

      const games = faker.datatype.number({ min: 10, max: 200 });
      const wins = faker.datatype.number({ min: 0, max: games });
      const draws = faker.datatype.number({ min: 0, max: games - wins });
      const losses = games - (wins + draws);

      const stats = new Statistics({
        players: faker.datatype.number({ min: 2, max: 200 }),
        wins: wins,
        losses: losses,
        draws: draws,
        games: games,
      });
      await stats.save();

      const event = new Event({
        title: getRandomTournamentName(),
        date: faker.date.future(),
        location: location._id,
        statistics: stats._id,
      });
      await event.save();
    }

    console.log("Mock Chess Tournament Data Created Successfully");
  } catch (err) {
    console.error("Error creating mock data:", err);
  }
};

module.exports = mockData;
