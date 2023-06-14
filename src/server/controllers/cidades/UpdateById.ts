import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models/Cidades";
import { CidadesProvider } from "../../database/providers/cidades";


interface IParmProps {
  id?: number;
}
type IBodyProps = Omit<ICidade, "id">

const updateParamsValidation : yup.ObjectSchema<IParmProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

const updateBodyValidation : yup.ObjectSchema<IBodyProps> = yup.object().shape({
  nome: yup.string().required().min(3),
});


export const updateByIdValidation = validation({
  body: updateBodyValidation,
  params: updateParamsValidation,
});


export const updateById = async (req: Request<IParmProps, {}, IBodyProps> , res: Response) =>  {
  // const data: Icidade = req.body;

  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parametro 'id' precisa ser enviado",
      }
    });
  }

  const result = await CidadesProvider.updateById(req.params.id, req.body);
  
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.NO_CONTENT).json(result);
};