import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models/Cidades";


export const updateById = async (id: number, cidade: Omit<ICidade, "id">): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where("id", "=", id);

    if(result > 0){
      return;
    } else {
      return Error("Registro inexistente ou erro ao buscar o registro");
    }
  } catch (error) {
    return Error("Erro ao atualizar o registro!");
  }
};