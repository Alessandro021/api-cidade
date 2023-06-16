import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { PessoaProvider } from "../../database/providers/pessoas";

interface IParmProps {
  id?: number;
}

const deleteParamsValidation: yup.ObjectSchema<IParmProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

export const deleteByIdValidation = validation({
  params: deleteParamsValidation
});

export const deleteById = async (req: Request<IParmProps>, res: Response) => {
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parametro 'id' precisa ser enviado",
      }
    });
  }

  const result = await PessoaProvider.deleteById(req.params.id);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};