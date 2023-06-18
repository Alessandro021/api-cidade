import express, { json } from "express";
import cors from "cors";


import "./shared/services/TranslationsYup";
import { router } from "./routes";

export const server = express();

server.use(json());
server.use(cors({
  // origin: process.env.ORIGIN_CORS?.split(";") || []
  origin: "*"
}));


server.use(router);
