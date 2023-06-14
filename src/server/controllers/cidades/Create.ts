import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middleware";
import { ICidade } from "../../database/models/Cidades";
import { CidadesProvider } from "../../database/providers/cidades";

type IBodyProps = Omit<ICidade, "id">

const bodyValidation : yup.ObjectSchema<IBodyProps> = yup.object().shape({
  nome: yup.string().required().min(3).max(150),
  
});

export const createValidation = validation({
  body: bodyValidation,
});


export const create = async (req: Request<{}, {}, IBodyProps> , res: Response) =>  {
  // const data: Icidade = req.body;
 
  const result = await CidadesProvider.create(req.body);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};