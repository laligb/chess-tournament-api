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
    "European Chess Championship",
    "Masters Cup",
    "Elite Chess Battle",
    "Challenger Chess Tournament",
    "Grand Slam Chess",
    "Ultimate Chess Challenge",
    "Chess Royale",
    "International Blitz Cup",
    "Rapidfire Chess Tournament",
    "Grandmasters Invitational",
    "FIDE Grand Prix",
    "World Blitz Championship",
    "Global Chess Open",
    "Royal Chess Tournament",
    "Strategic Chess Cup",
    "Chess Superleague",
    "Champions Chess Tournament",
    "Premier Chess Championship",
    "International Knights Cup",
    "Battle of the Bishops",
    "Dynamic Chess Open",
    "Modern Chess Championship",
    "Chess Titans Invitational",
    "Future Chess Stars Cup",
    "Grand Chess Festival",
    "Masters of Chess",
    "Chess Innovators Tournament",
    "Revolution Chess Open",
    "Invincible Chess Championship",
  ];
  return tournaments[Math.floor(Math.random() * tournaments.length)];
};

const europeanLocations = [
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Berlin", latitude: 52.52, longitude: 13.405 },
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
  { name: "Vienna", latitude: 48.2082, longitude: 16.3738 },
  { name: "Amsterdam", latitude: 52.3676, longitude: 4.9041 },
  { name: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
  { name: "Milan", latitude: 45.4642, longitude: 9.19 },
  { name: "Lisbon", latitude: 38.7223, longitude: -9.1393 },
  { name: "Prague", latitude: 50.0755, longitude: 14.4378 },
];

const tournamentTypes = ["individual", "team"];
const tournamentFormats = ["blitz", "rapid", "standard"];

const mockData = async () => {
  try {
    await Promise.all([
      Event.deleteMany({}),
      Statistics.deleteMany({}),
      Location.deleteMany({}),
    ]);
    console.log("Existing data cleared");

    const locations = await Location.insertMany(europeanLocations);
    console.log("Inserted European locations");

    const numEvents = 40;
    for (let i = 0; i < numEvents; i++) {
      const randomIndex = Math.floor(Math.random() * locations.length);
      const location = locations[randomIndex];

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
        type: tournamentTypes[
          Math.floor(Math.random() * tournamentTypes.length)
        ],
        format:
          tournamentFormats[
            Math.floor(Math.random() * tournamentFormats.length)
          ],
      });
      await event.save();
    }

    console.log("Mock Chess Tournament Data Created Successfully");
  } catch (err) {
    console.error("Error creating mock data:", err);
  }
};

module.exports = mockData;
