import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number } from "yup";


describe("Pessoa - GetAll", () => {

  let cidadeId: number | undefined = undefined;
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-pessoa2@teste.com";

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



  it("Buscar todos os registros", async () => {
    const res1 = await testServer.post("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nome: "Maria",
        sobreNome: "Arruda Perirra",
        email: "maria@teste4.com",
        cidadeId: cidadeId
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/pessoas")
      .set({Authorization: `Bearer ${accessToken}`})
      .send();


    expect(Number(resBuscada.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
  
});