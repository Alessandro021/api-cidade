import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";


export const getById = async (id: number): Promise<IPessoa | Error> => {

  try {
    const result = await Knex(ETableNames.pessoa).select("*").where("id", "=", id).first();

    if(result) {
      return result;
    } else {
      return new Error("Registro inexistente ou erro ao buscar o registro");
    }
  } catch (error) {
    return new Error("Erro ao buscar o registro!");
  }

};