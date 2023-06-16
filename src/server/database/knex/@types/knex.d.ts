
import { ICidade } from "../../models/Cidades";
import { IPessoa } from "../../models/Pessoa";
import { IUsuario } from "../../models/Usuarios";

declare module "knex/types/tables" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Tables {
    cidade: Icidade;
    pessoa: IPessoa;
    usuario: IUsuario;
  }
}