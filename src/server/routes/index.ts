import { Router } from "express";

import { CidadesController } from "../controllers/cidades";
import { PessoaController } from "../controllers/pessoas";
import { UsuarioController } from "../controllers/usuarios";
import { ensureAuthenticated } from "../shared/middleware";


export const router = Router();

//TESTE
router.get("/", (req, res) => {
  return res.send("ESSTE E UM TESTE").status(200);
});


//ROTAS CIDADES
router.get("/cidades", ensureAuthenticated, CidadesController.getAllValidation , CidadesController.getAll);
router.post("/cidades", ensureAuthenticated, CidadesController.createValidation , CidadesController.create);
router.get("/cidades/:id", ensureAuthenticated, CidadesController.getByIdValidation , CidadesController.getById);
router.put("/cidades/:id", ensureAuthenticated, CidadesController.updateByIdValidation , CidadesController.updateById);
router.delete("/cidades/:id", ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);

//ROTAS PESSOAS
router.get("/pessoas", ensureAuthenticated, PessoaController.getAllValidation , PessoaController.getAll);
router.post("/pessoas", ensureAuthenticated, PessoaController.createValidation , PessoaController.create);
router.get("/pessoas/:id", ensureAuthenticated, PessoaController.getByIdValidation , PessoaController.getById);
router.put("/pessoas/:id", ensureAuthenticated, PessoaController.updateByIdValidation , PessoaController.updateById);
router.delete("/pessoas/:id", ensureAuthenticated, PessoaController.deleteByIdValidation, PessoaController.deleteById);

//ROTAS USUARIOS
router.post("/cadastrar", UsuarioController.SignUpValidation , UsuarioController.SignUp);
router.post("/entrar", UsuarioController.sigInEmailValidation , UsuarioController.sigIn);
