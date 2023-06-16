import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoa - UpdateById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .send({nome: "Urucuia"});
    
    cidadeId = resCidade.body;
  });


  it("Atualiza o registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nome: "Maria",
      sobreNome: "Arruda Perirra",
      email: "maria@teste6.com",
      cidadeId: cidadeId
    });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resAtualiza = await testServer.put(`/pessoas/${res1.body}`).send({nome: "Marisa",
      sobreNome: "Arruda Ferreira",
      email: "maria@teste.com",
      cidadeId: cidadeId
    });
    expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/pessoas/9999").send({nome: "Maria",
      sobreNome: "Arruda Perirra",
      email: "maria@teste.com",
      cidadeId: cidadeId
    });


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });

});