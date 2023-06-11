import { Router } from "express";

import { CidadesController } from "../controllers/cidades";

export const router = Router();

//TESTE
router.get("/", (req, res) => {
  return res.send("ESSTE E UM TESTE").status(200);
});


//ROTAS CIDADES
router.get("/cidades", CidadesController.getAllValidation , CidadesController.getAll);
router.post("/cidades", CidadesController.createValidation , CidadesController.create);
router.get("/cidades/:id", CidadesController.getByIdValidation , CidadesController.getById);
router.put("/cidades/:id", CidadesController.updateByIdValidation , CidadesController.updateById);
router.delete("/cidades/:id", CidadesController.deleteByIdValidation, CidadesController.deleteById);