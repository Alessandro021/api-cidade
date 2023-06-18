import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {

  let accessToken = "";
  beforeAll(async () => {
    const email = "create-cidade2@teste.com";
    await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: email,
      senha: "123456"
    });

    const signInRes = await testServer.post("/entrar").send({email, senha: "123456"});

    accessToken = signInRes.body.accessToken;
  });


  it("Buscar todos os registros", async () => {
    const res1 = await testServer.post("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Urucuia"
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send();


    expect(Number(resBuscada.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
  
});