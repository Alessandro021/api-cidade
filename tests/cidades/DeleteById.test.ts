import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteByID", () => {

  let accessToken = "";
  beforeAll(async () => {
    const email = "create-cidade1@teste.com";
    await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: email,
      senha: "123456"
    });

    const signInRes = await testServer.post("/entrar").send({email, senha: "123456"});

    accessToken = signInRes.body.accessToken;
  });


  it("Apagar registro", async () => {
    const res1 = await testServer.post("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Urucuia"
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resApagada = await testServer.delete(`/cidades/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("ATentar apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/cidades/9999")
      .set({Authorization: `Bearer ${accessToken}`})
      .send();


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });



});