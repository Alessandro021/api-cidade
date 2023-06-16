import { IPessoa } from "../../database/models/Pessoa";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { PessoaProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";
 
interface IBodyProps{
  nome: string;
  sobreNome: string;
  email: string;
  cidadeId: number;
}

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  email: yup.string().required().email(),
  nome: yup.string().required().min(3),
  sobreNome: yup.string().required().min(3),
  cidadeId: yup.number().integer().required(),
});

export const createValidation = validation({
  body: bodyValidation
});

export const create = async (req: Request<{}, {}, IBodyProps> , res: Response) =>  {
  const data = req.body;
  const trasformData: Omit<IPessoa, "id"> = {...data, nomeCompleto: `${req.body.nome} ${req.body.sobreNome}`};

  const result = await PessoaProvider.create(trasformData);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};