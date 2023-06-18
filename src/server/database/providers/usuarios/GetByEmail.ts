
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models/Usuarios";



export const getByEmail = async (email: string): Promise<IUsuario | Error> => {

  try {
    const result = await Knex.table(ETableNames.usuario).select("*").where("email", "=", email).first();
    if(result){
      return result;
    } else {
      return Error("Registro inexistente ou erro ao consultar o registro");
    }
  } catch (error) {
    return Error("Erro ao buscar o registro!");
  }

};