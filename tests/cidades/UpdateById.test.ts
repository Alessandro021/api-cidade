import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {


  it("Atualiza o registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Urucuia"
    });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resAtualiza = await testServer.put(`/cidades/${res1.body}`).send({nome: "Urucuia"});
    expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/cidades/9999").send({nome: "Urucuia"});


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });

});