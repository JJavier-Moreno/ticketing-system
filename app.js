import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import {conn} from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";


export const app = express();

dotenv.config();

conn;

app.use(morgan("dev"));
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);


