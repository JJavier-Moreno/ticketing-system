import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import {conn} from "./db.js";

export const app = express();

dotenv.config();

conn;

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("HOLA MUNDO");
})


