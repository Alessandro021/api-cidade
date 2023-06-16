import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoa - GetById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .send({nome: "Urucuia"});
    
    cidadeId = resCidade.body;
  });


  it("Buscar registro por id", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nome: "Maria",
      sobreNome: "Arruda Perirra",
      email: "maria@teste5.com",
      cidadeId: cidadeId
    });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resBuscada = await testServer.get(`/pessoas/${res1.body}`).send();
    
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");
  });

  it("Tentar buscar registro que não existe", async () => {
    const res1 = await testServer.get("/pessoas/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});