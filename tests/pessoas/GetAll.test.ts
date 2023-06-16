import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number } from "yup";


describe("Pessoa - GetAll", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .send({nome: "Urucuia"});
    
    cidadeId = resCidade.body;
  });


  it("Buscar todos os registros", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nome: "Maria",
      sobreNome: "Arruda Perirra",
      email: "maria@teste4.com",
      cidadeId: cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/pessoas").send();


    expect(Number(resBuscada.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
  
});