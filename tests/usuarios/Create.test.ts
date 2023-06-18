import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuarios - Create", () => {


  it("Cria registro", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "Pedro",
      email: "pedro@teste.com",
      senha: "123456"
    });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tentar criar registro com nome muito curto", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "Ur",
      email: "pedro@teste.com",
      senha: "123456"
    });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });

  it("Tentar criar registro com email invalido", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "alex",
      email: "pedro1teste.com",
      senha: "123456"
    });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("Tentar criar registro com senha curta", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "alex",
      email: "pedro3@teste.com",
      senha: "13378"
    });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.senha");
  });

  it("Requisição sem campo obrigatorio", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
  
});