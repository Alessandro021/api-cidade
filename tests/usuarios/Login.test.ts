import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuarios - Login", () => {

  beforeAll(async () => {
    await testServer.post("/cadastrar").send({
      nome: "Pedro",
      email: "pedro4@teste.com",
      senha: "123456"
    });
  });

  it("Fazer login", async () => {
    const res1 = await testServer.post("/entrar").send({
      email: "pedro4@teste.com",
      senha: "123456"
    });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty("accessToken");
  });

  it("login com email invalido", async () => {
    const res1 = await testServer.post("/entrar").send({
      email: "pedro9999@teste.com",
      senha: "123456"
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("login com senha invalida", async () => {
    const res1 = await testServer.post("/entrar").send({
      email: "pedro9999@teste.com",
      senha: "12345636"
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});