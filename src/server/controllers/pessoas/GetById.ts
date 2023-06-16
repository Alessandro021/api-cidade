import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PessoaProvider } from "../../database/providers/pessoas";

interface IParmProps {
  id?: number
}

const paramsValidation: yup.ObjectSchema<IParmProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

export const getByIdValidation = validation({
  params: paramsValidation
});

export const getById = async (req: Request<IParmProps>, res: Response) => {
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parametro 'id' precisa ser enviado",
      }
    });
  }

  const result = await PessoaProvider.getById(req.params.id);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};