import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoa - DeleteByID", () => {

  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-pessoa1@teste.com";

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



  it("Apagar registro", async () => {
    const res1 = await testServer.post("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Maria",
        sobreNome: "Arruda Perirra",
        email: "maria@teste3.com",
        cidadeId: cidadeId
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resApagada = await testServer.delete(`/pessoas/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("ATentar apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/pessoas/9999")
      .set({Authorization: `Bearer ${accessToken}`})
      .send();


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });



});