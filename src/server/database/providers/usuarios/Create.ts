import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models/Usuarios";


export const create = async (usuario: Omit<IUsuario, "id">): Promise<number | Error> => {

  try {
    
    const hashPassword = await PasswordCrypto.hashPassword(usuario.senha);

    // usuario.senha = hashPassword;

    const [result] = await Knex(ETableNames.usuario).insert({...usuario, senha: hashPassword }).returning("id");

    if(typeof result === "object"){
      return Number(result.id);
    } else if(typeof result === "number") {
      return result;
    }

    return new Error("Erro ao registro usuario!");
    
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return Error("Erro ao registro usuario!");
  }


};