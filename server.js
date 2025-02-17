import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import mockData from "./seeds/mockData.js";

const mongoURI =
  process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/chess-database";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log(`MongoDB connected at ${mongoURI}`);
    if (mongoURI.includes("127.0.0.1")) {
      await mockData();
    }
  })
  .catch((err) => console.log(err));

app.use("/api/events", eventRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
