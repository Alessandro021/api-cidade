import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {

  let accessToken = "";
  beforeAll(async () => {
    const email = "create-cidade4@teste.com";
    await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: email,
      senha: "123456"
    });

    const signInRes = await testServer.post("/entrar").send({email, senha: "123456"});

    accessToken = signInRes.body.accessToken;
  });


  it("Atualiza o registro", async () => {
    const res1 = await testServer.post("/cidades")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Urucuia"
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resAtualiza = await testServer.put(`/cidades/${res1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: "Urucuia"});
    expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/cidades/9999")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({nome: "Urucuia"});


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });

});