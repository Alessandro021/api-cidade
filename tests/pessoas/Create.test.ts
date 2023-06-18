import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoa - Create", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-pessoa@teste.com";
   
    await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: email,
      senha: "123456"
    });

    const signInRes = await testServer.post("/entrar").send({email, senha: "123456"});

    accessToken = signInRes.body.accessToken;

    const resCidade = await testServer
      .post("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: "Urucuia"});
  
    cidadeId = resCidade.body;

  });


  it("Cria registro", async () => {
    const res1 = await testServer.post("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Maria",
        sobreNome: "Arruda Perirra",
        email: "maria@teste.com",
        cidadeId: cidadeId
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tentar criar registro com nome muito curto", async () => {
    const res1 = await testServer.post("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Ma",
        sobreNome: "Arruda Perirra",
        email: "maria@gmail.com",
        cidadeId: cidadeId
      });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });

  it("Tentar criar registro com email nao aceito", async () => {
    const res1 = await testServer.post("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Macos",
        sobreNome: "Arruda Perirra",
        email: "mariaemailcom",
        cidadeId: cidadeId
      });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("Requisição sem campo obrigatorio", async () => {
    const res1 = await testServer.post("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        sobreNome: "Arruda Perirra",
        email: "maria@teste2.com",
        cidadeId: cidadeId
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
  
});