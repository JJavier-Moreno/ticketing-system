import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, ()=> {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`App listen on PORT: ${PORT}`);
})

export default server;