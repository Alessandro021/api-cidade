import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoa - DeleteByID", () => {

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .send({nome: "Urucuia"});
    
    cidadeId = resCidade.body;
  });


  it("Apagar registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nome: "Maria",
      sobreNome: "Arruda Perirra",
      email: "maria@teste3.com",
      cidadeId: cidadeId
    });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resApagada = await testServer.delete(`/pessoas/${res1.body}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("ATentar apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/pessoas/9999").send();


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });



});