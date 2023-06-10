import { Router } from "express";
// import { StatusCodes} from "http-status-codes";

import { CidadesController } from "../controllers/cidades";

export const router = Router();

//TESTE
router.get("/", (req, res) => {
  return res.send("ESSTE E UM TESTE").status(200);
});


//ROTAS CIDADES
router.post("/cidades", CidadesController.createBodyValidator, CidadesController.createQueryValidator , CidadesController.create);