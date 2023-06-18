import { IUsuario } from "../../database/models/Usuarios";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { UsuarioProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";


type IBodyProps = Omit<IUsuario, "id">

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  nome: yup.string().required().min(3).max(50),
  email: yup.string().required().email().min(6),
  senha: yup.string().required().min(6),
});

export const SignUpValidation = validation({
  body: bodyValidation
});

export const SignUp = async(req: Request<{},{}, IBodyProps>, res: Response) => {

  const result = await UsuarioProvider.create(req.body);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};