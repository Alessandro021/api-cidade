import { Router } from "express";
import { StatusCodes} from "http-status-codes";

export const router = Router();

router.get("/", (req, res) => {
  return res.send("ESSTE E UM TESTE").status(200);
});

router.post("/teste", (req, res) => {
  const {name} = req.body;
  
  return res.status(StatusCodes.ACCEPTED).send(`Parametro ${name} Passado`).status(200);
});