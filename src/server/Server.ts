import express, { json } from "express";


import "./shared/services/TranslationsYup";
import { router } from "./routes";

export const server = express();

server.use(json());


server.use(router);
