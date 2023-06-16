import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

interface IPessoa{
  nome: string;
  sobreNome: string;
  email: string;
  cidadeId: number;
}

export const updateById = async (id: number, pessoa: IPessoa): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", pessoa.cidadeId)
      .count<[{ count: number}]>("* as count");

    if(count === 0){
      return new Error("A cidade usada no cadastro não foi encontrada");
    }

    const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where("id", "=", id);

    if(result === 0){
      return new Error(`Erro ao atualizar pessoa com o ID ${id}`);
    } else {
      return; 
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return new Error("Erro ao buscar registros");
  }

};