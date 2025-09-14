import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.get("/", (req,res)=>{
    res.send("HOLA MUNDO");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`App listen on PORT: ${PORT}`);
})