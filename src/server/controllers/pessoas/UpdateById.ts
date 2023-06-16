import { IPessoa } from "../../database/models/Pessoa";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PessoaProvider } from "../../database/providers/pessoas";


interface IParmProps {
  id?: number;
}
interface InterfacePessoa{
  nome: string;
  sobreNome: string;
  email: string;
  cidadeId: number;
}

type IBodyProps = InterfacePessoa

const updateBodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  email: yup.string().required().email(),
  nome: yup.string().required().min(3),
  sobreNome: yup.string().required().min(3),
  cidadeId: yup.number().integer().required().moreThan(0),
});

const updateParamsValidation: yup.ObjectSchema<IParmProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

export const updateByIdValidation = validation({
  body: updateBodyValidation,
  params: updateParamsValidation,
});

export const updateById = async (req: Request<IParmProps, {}, IBodyProps>, res: Response) => {
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parametro 'id' precisa ser enviado",
      }
    });
  }
  const data = req.body;
  const trasformData: Omit<IPessoa, "id"> = {...data, nomeCompleto: `${req.body.nome} ${req.body.sobreNome}`};

  const result = await PessoaProvider.updateById(req.params.id, trasformData);
  
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.NO_CONTENT).json(result);
};