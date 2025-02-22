import dotenv from "dotenv";
dotenv.config();
console.log("ATLAS_URI:", process.env.ATLAS_URI);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import mockData from "./seeds/mockData.js";

const mongoURI =
  process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/chess-database";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoURI, { serverSelectionTimeoutMS: 60000 })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const allowedOrigins = [
  'https://chess-tournament-react.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  optionsSuccessStatus: 200
};


const app = express();
app.use(express.json());
app.use(cors(corsOptions));

dbConnect()
  .then(async () => {
    console.log(`MongoDB connected at ${mongoURI}`);

    if (mongoURI.includes("127.0.0.1")) {
      await mockData();
      console.log("done database");
    }
  })
  .catch((err) => console.log("DB connection error:", err));

app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
}

export default app;
