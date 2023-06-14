import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models/Cidades";


export const create = async (cidade: Omit<ICidade, "id">): Promise<number | Error> => {

  try {
    const [result] = await Knex(ETableNames.cidade).insert(cidade).returning("id");

    if(typeof result === "object"){
      return Number(result.id);
    } else if(typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro!");
    
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return Error("Erro ao cadastrar o registro!");
  }


};