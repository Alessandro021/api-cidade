import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UsuarioProvider } from "../../database/providers/usuarios";
import { IUsuario } from "../../database/models/Usuarios";
import { JWTService, PasswordCrypto } from "../../shared/services";

 type IBodyProps = Omit<IUsuario, "id" | "nome">

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  email: yup.string().required().email().min(6),
  senha: yup.string().required().min(6),
});

export const sigInEmailValidation = validation({
  body: bodyValidation
});

export const sigIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const { email, senha } = req.body;

  if(!email || !senha){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parametro 'email' ou 'senha' precisa ser enviado",
      }
    });
  }

  const usuario = await UsuarioProvider.getByEmail(email);

  if(usuario instanceof Error){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são invalidos"
      }
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);
  if(!passwordMatch){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são invalidos"
      }
    });
  } else {
    const accessToken = JWTService.sign({uid: usuario.id});

    if(accessToken === "JWT_SECRET_NOT_FOUND"){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o token de acesso"
        }
      });
    }
    return res.status(StatusCodes.OK).json({ accessToken: accessToken });
  }

  

};