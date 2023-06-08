import express, { json } from "express";
import "dotenv/config";

import { router } from "./routes";

export const server = express();

server.use(json());

server.use(router);
