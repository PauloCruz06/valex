import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(json());
server.use(cors());

const port = +process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});