import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {

  let accessToken = "";
  beforeAll(async () => {
    const email = "create-cidade@teste.com";
    await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: email,
      senha: "123456"
    });

    const signInRes = await testServer.post("/entrar").send({email, senha: "123456"});

    accessToken = signInRes.body.accessToken;
  });

  it("Tenta cria registro sem token de acesso", async () => {
    const res1 = await testServer
      .post("/cidades")
      .send({
        nome: "Urucuia"
      });


    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Urucuia"
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tentar criar registro com nome muito curto", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Ur"
      });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });

  it("Requisição sem campo obrigatorio", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
      
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
  
});