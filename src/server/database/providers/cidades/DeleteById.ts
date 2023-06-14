import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async ( id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where("id","=",id)
      .del();

    if(result === 0){
      return new Error("Registro inixistente ou error ao deletar registro");
    } else{
      return;
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return new Error("Erro ao deletar registro");
    
  }
};