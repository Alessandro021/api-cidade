import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoa - GetById", () => {

  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-pessoa3@teste.com";

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



  it("Buscar registro por id", async () => {
    const res1 = await testServer.post("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Maria",
        sobreNome: "Arruda Perirra",
        email: "maria@teste5.com",
        cidadeId: cidadeId
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resBuscada = await testServer.get(`/pessoas/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");
  });

  it("Tentar buscar registro que não existe", async () => {
    const res1 = await testServer.get("/pessoas/9999")
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});