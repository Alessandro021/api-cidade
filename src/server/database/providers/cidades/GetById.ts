
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models/Cidades";


export const getById = async (id:number): Promise<ICidade | Error> => {

  try {
    const result = await Knex.table(ETableNames.cidade).select("*").where("id", "=", id).first();
    if(result){
      return result;
    } else {
      return Error("Registro inexistente ou erro ao buscar o registro");
    }
  } catch (error) {
    return Error("Erro ao buscar o registro!");
  }

};