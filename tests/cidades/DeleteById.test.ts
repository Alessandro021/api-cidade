import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteByID", () => {


  it("Apagar registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Urucuia"
    });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resApagada = await testServer.delete(`/cidades/${res1.body}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("ATentar apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/cidades/9999").send();


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });



});