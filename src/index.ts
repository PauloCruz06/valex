import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(json());
server.use(cors());
server.use(router);
server.use(errorHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});