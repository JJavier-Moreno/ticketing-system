import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/ticket-system-db-test"
    : process.env.DB_URL || "mongodb://localhost:27017/ticket-system-db";

export const conn = mongoose
  .connect(URL)
  .then(() => console.log(`Connected to DB: ${URL}`))
  .catch((error) => console.log(`Failed to connect to MongoDB`, error));
