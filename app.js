import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

export const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("HOLA MUNDO");
})


