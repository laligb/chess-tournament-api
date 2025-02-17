require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const mockData = require("./seeds/mockData");

const mongoURI =
  process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/chess-database";
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log(`MongoDB connected at ${mongoURI}`);

    if (mongoURI.includes("127.0.0.1")) {
      await mockData();
    }
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
